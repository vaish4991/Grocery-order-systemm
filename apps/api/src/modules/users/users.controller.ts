import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto, CreateAddressDto } from './dto/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ── Customer: own profile ──────────────────────────────────────────────────
  @Get('users/me')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch('users/me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  // ── Customer: addresses ────────────────────────────────────────────────────
  @Get('users/me/addresses')
  @ApiOperation({ summary: 'Get all saved addresses' })
  getAddresses(@CurrentUser('id') userId: string) {
    return this.usersService.getAddresses(userId);
  }

  @Post('users/me/addresses')
  @ApiOperation({ summary: 'Add a new delivery address' })
  createAddress(@CurrentUser('id') userId: string, @Body() dto: CreateAddressDto) {
    return this.usersService.createAddress(userId, dto);
  }

  @Patch('users/me/addresses/:id')
  @ApiOperation({ summary: 'Update a delivery address' })
  updateAddress(
    @CurrentUser('id') userId: string,
    @Param('id') addressId: string,
    @Body() dto: Partial<CreateAddressDto>,
  ) {
    return this.usersService.updateAddress(userId, addressId, dto);
  }

  @Delete('users/me/addresses/:id')
  @ApiOperation({ summary: 'Delete a delivery address' })
  deleteAddress(@CurrentUser('id') userId: string, @Param('id') addressId: string) {
    return this.usersService.deleteAddress(userId, addressId);
  }

  // ── Admin: manage users ────────────────────────────────────────────────────
  @Get('admin/users')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] List all users' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Get('admin/users/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('admin/users/:id/status')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Update user status (ACTIVE/BANNED)' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.usersService.updateStatus(id, status);
  }
}
