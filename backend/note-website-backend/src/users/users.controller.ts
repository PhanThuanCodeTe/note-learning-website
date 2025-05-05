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
export class UsersController { // constructor
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryConfig: CloudinaryConfig,
  ) {}

  @Post('register') //endpoint
  @UseInterceptors( // use to handle file upload
    FileInterceptor('avatar', {
      storage: multer.diskStorage({ // config for multer
        destination: './uploads', // folder to save image
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // generate unique name
          const fileExt = file.originalname.split('.').pop(); // get file extension
          cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`); // save file with unique name 
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, cb) => {
        // check if file is image
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|jpg)$/)) {
          return cb(new BadRequestException('Only image files (jpg, jpeg, png, gif) are allowed!'), false); // throw exception
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

      // If have avatar in request
      if (avatar) {
        try {
          const uploadResult = await this.cloudinaryConfig.uploadImage(avatar);
          avatarUrl = uploadResult.url;
        } catch (error) {
          throw new BadRequestException(`Upload failed: ${error.message}`);
        } finally {
          // Delete temp avatar in upload
          if (avatar.path) {
            removeFile(avatar.path);
          }
        }
      } else if (!avatarUrl) {
        // Create sample avatar url if dont have avatar or link in request
        avatarUrl = generateDefaultAvatar();
      }

      // Add sample avatar url to CreateUserDto 
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