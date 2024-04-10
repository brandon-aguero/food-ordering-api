<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Food Ordering API

This is a REST API for managing food ordering operations. The API provides endpoints for user authentication, user management, country/city/postal code/address management, category management, image management, user profiles, roles (admin, delivery, owner, customer), restaurants, menus, orders, order menu details, deliveries, reviews, payment methods, payments, chats, and messages. Users can register, log in, create profiles, place orders, leave reviews, make payments, and communicate with delivery personnel through the chat feature. The API supports email confirmation, Google authentication, and role-based access control.

## Database Design

### Image

![Design](https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/food-ordering-api/vskygnxypq3b4akzf72l)

### Code from DbDiagram

```
Enum Gender {
  "male"
  "female"
}

Enum FileType {
  "jpg"
  "jpeg"
  "svg"
  "png"
}

Enum OrderStatus {
  "pending"
  "confirmed"
  "prepared"
  "delivered"
  "canceled"
}

Enum DeliveryStatus {
  "pending"
  "in-transit"
  "delivered"
}

Enum PaymentStatus {
  "pending"
  "completed"
  "failed"
}

Enum CategoryType {
  "menu"
  "restaurant"
}

Enum UserRole {
  "admin" // administrator
  "delivery" // delivery man
  "owner" // restaurant owner
  "customer" // customer
}

Table countries {
  id integer [primary key, increment]
  name varchar(60) [unique, not null]
  phone_code varchar(6) [unique, not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  indexes {
    (id) [pk]
  }
}

Table cities {
  id integer [primary key, increment]
  name varchar(60) [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  country_id integer [not null, ref: > countries.id]
  indexes {
    (id) [pk]
  }
}

Table postal_codes {
  id integer [primary key, increment]
  code varchar(20) [unique, not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  city_id integer [not null, ref: - cities.id]
  indexes {
    (id) [pk]
  }
}

Table addresses {
  id integer [primary key, increment]
  address_line varchar(255) [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  postal_code_id integer [not null, ref: > postal_codes.id]
  city_id integer [not null, ref: > cities.id]
  country_id integer [not null, ref: > countries.id]
  indexes {
    (id) [pk]
  }
}

Table categories {
  id integer [primary key, increment]
  name varchar(60) [unique, not null]
  description text [not null]
  type CategoryType [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_id integer [not null, ref: - images.id]
  indexes {
    (id) [pk]
  }
}

Table image_metadata {
  id integer [primary key, increment]
  type FileType [not null]
  width_px integer [not null]
  height_px integer [not null]
  size_kb decimal [not null]
  alt_text varchar(255) [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  indexes {
    (id) [pk]
    (type) [name: "idx_type"]
  }
}

Table images {
  id integer [primary key, increment]
  url text [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_metadata_id integer  [not null, ref: - image_metadata.id]
  indexes {
    (id) [pk]
  }
}

Table menu_images {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_id integer [not null, ref: - images.id]
  menu_id integer [not null, ref: > menus.id]
}

Table restaurant_images {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_id integer [not null, ref: - images.id]
  restaurant_id integer [not null, ref: - restaurants.id]
}

Table customer_images {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_id integer [not null, ref: - images.id]
  customer_id integer [not null, ref: - customers.id]
}

Table owner_images {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_id integer [not null, ref: - images.id]
  owner_id integer [not null, ref: - owners.id]
}

Table delivery_person_images {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_id integer [not null, ref: - images.id]
  delivery_person_id integer [not null, ref: - delivery_persons.id]
}

Table admin_images {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  image_id integer [not null, ref: - images.id]
  admin_id integer [not null, ref: - admins.id]
}

Table users {
  id integer [primary key, increment]
  email varchar(320) [unique, not null]
  password varchar(255) [not null]
  can_receive_promo_emails boolean [not null]
  stripe_customer_id varchar(255) [null, default: null]
  refresh_token varchar(255) [null, default: null]
  is_email_confirmed boolean [not null, default: false]
  is_registered_withGoogle boolean [not null, default: false]
  role UserRole [not null, default: "customer"]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  indexes {
    (id) [pk]
    (role) [name: "idx_role"]
  }
}

Table profiles {
  id integer [primary key, increment]
  first_name varchar(40) [not null]
  last_name varchar(40) [not null]
  date_of_birth date [not null]
  gender Gender [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  user_id integer [ref: - users.id]
  country_id integer [ref: > countries.id]
  indexes {
    (id) [pk]
    (gender) [name: "idx_gender"]
  }
}

Table customers {
  id integer [primary key, increment]
  phone_number varchar(30) [null]
  is_phone_number_confirmed boolean [not null, default: false]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  user_id integer [not null, ref: - users.id]
  customer_image_id integer [null, default: null, ref: - customer_images.id]
  active_chat_id integer [null, default: null, ref: > chats.id]
  indexes {
    (id) [pk]
  }
}

Table delivery_persons {
  id integer [primary key, increment]
  phone_number varchar(30) [null]
  is_phone_number_confirmed boolean [not null, default: false]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  user_id integer [not null, ref: - users.id]
  delivery_person_image_id integer [not null, ref: - delivery_person_images.id]
  active_chat_id integer [null, default: null, ref: > chats.id]
  indexes {
    (id) [pk]
  }
}

Table owners {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  user_id integer [not null, ref: - users.id]
  owner_image_id integer [null, default: null, ref: - owner_images.id]
  indexes {
    (id) [pk]
  }
}

Table admins {
  id integer [primary key, increment]
  ssn varchar(50) [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  user_id integer [not null, ref: - users.id]
  indexes {
    (id) [pk]
  }
}

Table restaurants {
  id integer [primary key, increment]
  name varchar(50) [not null]
  description text [not null]
  contact_number varchar(30) [not null]
  is_contact_number_confirmed boolean [not null, default: false]
  opening_hours timetz [not null]
  average_rating decimal [not null, note: "CHECK (Rating >= 1 AND Rating <= 5)"]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  owner_id integer [not null, ref: > users.id]
  address_id integer [not null, ref: - addresses.id]
  indexes {
    (id) [pk]
    (average_rating) [name: "idx_average_rating"]
  }
}

Table restaurants_categories {
  restaurant_id integer [not null, ref: > restaurants.id]
  category_id integer [not null, ref: > categories.id]
}

Table menus {
  id integer [primary key, increment]
  name varchar(50) [not null]
  description text [not null]
  price decimal [not null]
  is_promotional boolean [default: false]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  category_id integer [not null, ref: > categories.id]
  restaurant_id integer [not null, ref: > restaurants.id]
  indexes {
    (id) [pk]
    (price) [name: "idx_price"]
    (is_promotional) [name: "idx_is_promotional"]
  }
}

Table orders {
  id integer [primary key, increment]
  order_date timestamptz [not null, default: `now()`]
  delivery_address varchar(255) [not null]
  total_amount decimal [not null]
  status OrderStatus [not null, default: "pending"]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  user_id integer [not null, ref: > users.id]
  restaurant_id integer [not null, ref: > restaurants.id]
  indexes {
    (id) [pk]
    (status) [name: "idx_status"]
  }
}

Table orders_menus_details {
  id integer [primary key, increment]
  quantity integer [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  order_id integer [not null, ref: > orders.id]
  menu_id integer [not null, ref: > menus.id]
  indexes {
    (id) [pk]
  }
}

Table deliveries {
  id integer [primary key, increment]
  delivery_address varchar(255) [not null]
  estimated_delivery_time timetz [not null]
  actual_delivery_time timetz [not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  order_id integer [not null, ref: - orders.id]
  delivery_person_id integer [not null, ref: > users.id]
  indexes {
    (id) [pk]
  }
}

Table reviews {
  id integer [primary key, increment]
  rating integer [note: "CHECK (Rating >= 1 AND Rating <= 5)"]
  comment text
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  user_id integer [not null, ref: > users.id]
  restaurant_id integer [not null, ref: > restaurants.id]
  indexes {
    (id) [pk]
    (rating) [name: "idx_rating"]
  }
}

Table payment_methods {
  id integer [primary key, increment]
  name varchar(100) [unique, not null]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  indexes {
    (id) [pk]
  }
}

Table payments {
  id integer [primary key, increment]
  status PaymentStatus [not null, default: "pending"]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  order_id integer [not null, ref: > orders.id]
  payment_method_id integer [not null, ref: > payment_methods.id]
  indexes {
    (id) [pk]
    (status) [name: "idx_status"]
  }
}

Table chats {
  id integer [primary key, increment]
  created_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  updated_at timestamptz [default: `now()`, note: 'TypeORM: @UpdateDateColumn']
  delivery_id integer [not null, ref: > users.id]
  customer_id integer [not null, ref: > users.id]
  order_id integer [not null, ref: > orders.id]
  indexes {
    (id) [pk]
  }
}

Table messages {
  id integer [primary key, increment]
  chat_id integer [ref: > chats.id]
  sender_id integer [ref: > users.id]
  receiver_id integer [ref: > users.id]
  content text [not null]
  sent_at timestamptz [default: `now()`, note: 'TypeORM: @CreateDateColumn']
  indexes {
    (id) [pk]
  }
}
```

## API Endpoints Documentation

### Auth

- **POST /auth/sign-up**: Register a new user account.
- **POST /auth/log-in**: Authenticate and log in a user.
- **POST /auth/log-out**: Log out the authenticated user.
- **GET /auth/refresh**: Refresh the access token using the provided refresh token

### Google Authentication

- **POST /google-auth**: Authenticate using Google OAuth.

### Email Confirmation

- **POST /confirm**: Confirm user's email address with provided token.
- **POST /resend-confirmation**: Request a new email confirmation link to be sent.

### Account Management

- **GET /account**: Retrieve account details for the authenticated user.
- **POST /account/profile**: Create a new profile for the authenticated user.
- **PATCH /account/profile**: Update the profile details for the authenticated user.
- **DELETE /account/delete**: Delete the account of the authenticated user.

### Countries

- **GET /countries**: Retrieve a list of all countries.
- **GET /countries/:id**: Retrieve a specific country by ID.
- **POST /countries**: Create a new country.
- **PUT /countries/:id**: Update a specific country by ID.
- **DELETE /countries/:id**: Delete a specific country by ID.

### Cities

- **GET /countries/:countryId/cities**: Retrieve all cities of a country.
- **GET /cities/:id**: Retrieve a specific city by ID.
- **POST /cities**: Create a new city.
- **PUT /cities/:id**: Update a specific city by ID.
- **DELETE /cities/:id**: Delete a specific city by ID.

### Postal Codes

- **GET /cities/:cityId/postal_codes**: Retrieve all postal codes of a city.
- **GET /postal_codes/:id**: Retrieve a specific postal code by ID.
- **POST /postal_codes**: Create a new postal code.
- **PUT /postal_codes/:id**: Update a specific postal code by ID.
- **DELETE /postal_codes/:id**: Delete a specific postal code by ID.

### Addresses

- **GET /addresses**: Retrieve a list of all addresses.
- **GET /addresses/:id**: Retrieve a specific address by ID.
- **POST /addresses**: Create a new address.
- **PUT /addresses/:id**: Update a specific address by ID.
- **DELETE /addresses/:id**: Delete a specific address by ID.

### Categories

- **GET /categories**: Retrieve a list of all categories.
- **GET /categories/:id**: Retrieve a specific category by ID.
- **POST /categories**: Create a new category.
- **PUT /categories/:id**: Update a specific category by ID.
- **DELETE /categories/:id**: Delete a specific category by ID.

### Images

- **GET /images**: Retrieve a list of all images.
- **GET /images/:id**: Retrieve a specific image by ID.
- **POST /images**: Upload a new image.
- **PUT /images/:id**: Update a specific image by ID.
- **DELETE /images/:id**: Delete a specific image by ID.

### Users

- **GET /users**: Retrieve a list of all users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **POST /users/register**: Register a new user.
- **POST /users/login**: Log in a user.
- **PUT /users/:id**: Update a specific user by ID.
- **DELETE /users/:id**: Delete a specific user by ID.

### Profiles

- **GET /profiles**: Retrieve a list of all profiles.
- **GET /profiles/:id**: Retrieve a specific profile by ID.
- **POST /profiles**: Create a new profile.
- **PUT /profiles/:id**: Update a specific profile by ID.
- **DELETE /profiles/:id**: Delete a specific profile by ID.

### Roles

- **GET /:role**: Retrieve a list of all users of a specific role.
- **GET /:role/:id**: Retrieve a specific user of a specific role by ID.
- **POST /:role**: Create a new user of a specific role.
- **PUT /:role/:id**: Update a user of a specific role by ID.
- **DELETE /:role/:id**: Delete a user of a specific role by ID.

### Restaurants

- **GET /restaurants**: Retrieve a list of all restaurants.
- **GET /restaurants/:id**: Retrieve a specific restaurant by ID.
- **POST /restaurants**: Create a new restaurant.
- **PUT /restaurants/:id**: Update a specific restaurant by ID.
- **DELETE /restaurants/:id**: Delete a specific restaurant by ID.

### Menus

- **GET /menus**: Retrieve a list of all menus.
- **GET /menus/:id**: Retrieve a specific menu by ID.
- **POST /menus**: Create a new menu.
- **PUT /menus/:id**: Update a specific menu by ID.
- **DELETE /menus/:id**: Delete a specific menu by ID.

### Orders

- **GET /orders**: Retrieve a list of all orders.
- **GET /orders/:id**: Retrieve a specific order by ID.
- **POST /orders**: Create a new order.
- **PUT /orders/:id**: Update a specific order by ID.
- **DELETE /orders/:id**: Delete a specific order by ID.

### Order Menu Details

- **GET /orders/:orderId/menus_details**: Retrieve all menu details of an order.
- **GET /orders_menus_details/:id**: Retrieve a specific menu detail of an order by ID.
- **POST /orders/:orderId/menus_details**: Add a new menu detail to an order.
- **PUT /orders_menus_details/:id**: Update a specific menu detail of an order by ID.
- **DELETE /orders_menus_details/:id**: Delete a specific menu detail of an order by ID.

### Deliveries

- **GET /deliveries**: Retrieve a list of all deliveries.
- **GET /deliveries/:id**: Retrieve a specific delivery by ID.
- **POST /deliveries**: Create a new delivery.
- **PUT /deliveries/:id**: Update a specific delivery by ID.
- **DELETE /deliveries/:id**: Delete a specific delivery by ID.

### Reviews

- **GET /reviews**: Retrieve a list of all reviews.
- **GET /reviews/:id**: Retrieve a specific review by ID.
- **POST /reviews**: Create a new review.
- **PUT /reviews/:id**: Update a specific review by ID.
- **DELETE /reviews/:id**: Delete a specific review by ID.

### Payment Methods

- **GET /payment_methods**: Retrieve a list of all payment methods.
- **GET /payment_methods/:id**: Retrieve a specific payment method by ID.
- **POST /payment_methods**: Create a new payment method.
- **PUT /payment_methods/:id**: Update a specific payment method by ID.
- **DELETE /payment_methods/:id**: Delete a specific payment method by ID.

### Payments

- **GET /payments**: Retrieve a list of all payments.
- **GET /payments/:id**: Retrieve a specific payment by ID.
- **POST /payments**: Create a new payment.
- **PUT /payments/:id**: Update a specific payment by ID.
- **DELETE /payments/:id**: Delete a specific payment by ID.

### Chats

- **GET /chats**: Retrieve a list of all chats.
- **GET /chats/:id**: Retrieve a specific chat by ID.
- **POST /chats**: Create a new chat.
- **PUT /chats/:id**: Update a specific chat by ID.
- **DELETE /chats/:id**: Delete a specific chat by ID.
- **GET /chats/:chat-id/messages**: Retrieve all messages from a chat.
- **GET /messages/:chat-id**: Retrieve a specific message by ID.
- **POST /chats/:chat-id/messages**: Send a new message in a chat.
- **PUT /messages/:chat-id**: Update a specific message by ID.
- **DELETE /messages/:chat-id**: Delete a specific message by ID.
