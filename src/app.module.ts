import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { CourseModule } from './course/course.module';
import { SchoolModule } from './school/school.module';
import { DistrictModule } from './district/district.module';
import { ParentModule } from './parent/parent.module';
import { LessonModule } from './lesson/lesson.module';
import { ScienceModule } from './science/science.module';
import { FileModule } from './file/file.module';
import { UserImageModule } from './user-image/user-image.module';
import { PupilParentModule } from './pupil-parent/pupil-parent.module';
import { HomeWorkModule } from './home-work/home-work.module';
import { HomeWorkFileModule } from './home-work-file/home-work-file.module';
import { TimeTableModule } from './time-table/time-table.module';
import { HomeWorkSubmissionModule } from './home-work-submission/home-work-submission.module';
import { HomeWorkSubmissionFileModule } from './home-work-submission-file/home-work-submission-file.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ExamResultModule } from './exam-result/exam-result.module';
import { TeacherFanModule } from './teacher-fan/teacher-fan.module';
import { ChatGroupModule } from './chat-group/chat-group.module';
import { ChatGroupMemberModule } from './chat-group-member/chat-group-member.module';
import { MessageModule } from './message/message.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { LessonMaterialModule } from './lesson-material/lesson-material.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AdminModule,
    UsersModule,
    RegionModule,
    AuthModule,
    ClassModule,
    CourseModule,
    SchoolModule,
    DistrictModule,
    ParentModule,
    LessonModule,
    ScienceModule,
    FileModule,
    UserImageModule,
    PupilParentModule,
    HomeWorkModule,
    HomeWorkFileModule,
    TimeTableModule,
    HomeWorkSubmissionModule,
    HomeWorkSubmissionFileModule,
    AttendanceModule,
    ExamResultModule,
    TeacherFanModule,
    ChatGroupModule,
    ChatGroupMemberModule,
    MessageModule,
    AnnouncementModule,
    LessonMaterialModule,
    RolesModule,
    MailModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
