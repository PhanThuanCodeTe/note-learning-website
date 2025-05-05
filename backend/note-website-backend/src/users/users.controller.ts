import { Controller, Body, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/utils/response.util';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { generateDefaultAvatar } from 'src/common/utils/avatar.util';
import { removeFile } from 'src/common/utils/file.util';
import * as multer from 'multer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryConfig: CloudinaryConfig,
  ) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, cb) => {
        // Kiểm tra MIME type thay vì chỉ đuôi file
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|jpg)$/)) {
          return cb(new BadRequestException('Only image files (jpg, jpeg, png, gif) are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<ApiResponse> {
    try {
      let avatarUrl = createUserDto.avatar_url;

      // Xử lý avatar nếu được upload
      if (avatar) {
        try {
          const uploadResult = await this.cloudinaryConfig.uploadImage(avatar);
          avatarUrl = uploadResult.url;
        } catch (error) {
          throw new BadRequestException(`Upload failed: ${error.message}`);
        } finally {
          // Xóa file tạm sau khi upload
          if (avatar.path) {
            removeFile(avatar.path);
          }
        }
      } else if (!avatarUrl) {
        // Tạo avatar mặc định nếu không có avatar được upload và không có avatar_url
        avatarUrl = generateDefaultAvatar();
      }

      // Tạo đối tượng CreateUserDto mới với avatar_url đã được xử lý
      const userDataToSave = {
        ...createUserDto,
        avatar_url: avatarUrl,
      };

      return this.usersService.createUser(userDataToSave);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}