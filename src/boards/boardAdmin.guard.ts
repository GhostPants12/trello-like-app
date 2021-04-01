import {Injectable, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import { Role } from 'src/users/role.entity';
import {UserBoard} from './userBoard.entity';

@Injectable()
export class BoardAdminGuard implements CanActivate {
  constructor(@Inject('USERBOARDS_REPOSITORY') private userBoardRepository: typeof UserBoard,
  @Inject('ROLES_REPOSITORY') private rolesRepository: typeof Role) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const boardId = request.params.boardId;
    return this.userBoardRepository.findOne({where : {boardId : boardId, userId : userId}})
      .then(async (result) => {
        return await this.rolesRepository.findByPk(result.roleId);
    }).then((role) => role.rolename === 'Admin');
  }
}