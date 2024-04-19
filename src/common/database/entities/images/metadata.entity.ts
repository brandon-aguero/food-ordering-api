import { Column, Entity } from 'typeorm';
import { Base } from '../shared/base.entity';
import { FileType } from '../../models/enums/file-type.enum';

@Entity({ name: 'image_metadata' })
export class Metadata extends Base {
  @Column({
    type: 'enum',
    enum: FileType,
  })
  type: FileType;

  @Column({
    name: 'width_px',
    type: 'integer',
  })
  width: number;

  @Column({
    name: 'height_px',
    type: 'integer',
  })
  height: number;

  @Column({
    name: 'size_kb',
    type: 'decimal',
  })
  size: number;

  @Column({
    name: 'alt_text',
    type: 'varchar',
    length: 120,
  })
  alt: string;
}
