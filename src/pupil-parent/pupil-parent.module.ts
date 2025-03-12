import { Module } from '@nestjs/common';
import { PupilParentService } from './pupil-parent.service';
import { PupilParentController } from './pupil-parent.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PupilParentController],
  providers: [PupilParentService],
})
export class PupilParentModule {}
