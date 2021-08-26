import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseModel } from 'requestmodal/ResponseModel';
import { appDTO } from 'src/dto/appDTO';
import { approleDTO } from 'src/dto/appRoleDTO';
import { Admin } from 'src/entity/admin.entity';
import { App } from 'src/entity/app.entity';
import { AppRoles } from 'src/entity/app_roles.entity';
import { Client } from 'src/entity/client.entity';
import { Crud } from 'src/entity/crud.entity';
import { Feature } from 'src/entity/features.entity';
import { Role } from 'src/entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApproleService {

    constructor(
        @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
        @InjectRepository(Crud) private readonly crudRepository: Repository<Crud>,
        @InjectRepository(App) private readonly appRepository: Repository<App>,
        @InjectRepository(Feature) private readonly featureRepository: Repository<Feature>,
        @InjectRepository(AppRoles) private readonly approlesRepository: Repository<AppRoles>,
      ){}

      async addAppRole(@Body() body: any): Promise<ResponseModel<approleDTO>>{

        console.log(body.id);
       // const cms: Role = await this.roleRepository.findOne(body.id)
       const cms: AppRoles = new AppRoles()
        console.log(body.id);
      
        cms.approlename=body.approlename
        cms.adminname=body.adminname
        cms.rolename=body.rolename
        cms.rolepermission=body.rolepermission
        cms.app=body.app
        cms.role=body.role

        
      await this.approlesRepository.save(cms)
      
      const empDto:ResponseModel<approleDTO>= this.entityToDTOApprole(cms)
      JSON.stringify(empDto)
      return empDto
      
      }

      private entityToDTOApprole(data : AppRoles): ResponseModel<approleDTO>{

        const clientdto = new ResponseModel<approleDTO>();
         clientdto.id=data.id
        clientdto.approlename = data.approlename
        clientdto.adminname = data.adminname
        clientdto.rolepermission = data.rolepermission
        clientdto.app=data.app
        clientdto.role=data.role
        return clientdto
      }


      async getappRoles(){

        const emps: any[] = await this.approlesRepository.find()
        //console.log("sathya")
        const empsdto: approleDTO[] = emps.map(x=> this.entityToDTOApprole(x))
      
        return empsdto
      }

      async updateAppRoles(@Body()body:ResponseModel<approleDTO>): Promise<ResponseModel<approleDTO>>
      {
        console.log(body.id);
        const cms: AppRoles = await this.getOne(body.id)
        cms.approlename=body.approlename
        cms.adminname=body.adminname
        cms.rolename=body.rolename
        cms.rolepermission=body.rolepermission
        cms.app=body.app
        cms.role=body.role
      await this.approlesRepository.save(cms)
      
      const empDto: ResponseModel<approleDTO> = this.entityToDTOApprole(cms)
       return empDto
      //const empDto: roleDTO = this.entityToDTO(cms)
      //return empDto
      }

      
      
public async getOne(empid: number)
{
    const emp: AppRoles = await this.approlesRepository.findOne(empid)
  // console.log("sathya")
    if(!emp) throw new NotFoundException(`App with ID ${empid} was not found`)
    let empdto: any = this.entityToDTOApprole(emp)

    return empdto

}

public async deleteapprole(@Body()body:ResponseModel<approleDTO>): Promise<ResponseModel<approleDTO>>{
    let emp: AppRoles = await this.getOne(body.id)
    emp.id=body.id
    await this.approlesRepository.remove(emp)
  
    const empDto: ResponseModel<approleDTO> = this.entityToDTOApprole(emp)
   return empDto
  
  }
  
}
