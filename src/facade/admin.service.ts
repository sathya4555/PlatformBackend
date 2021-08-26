import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseModel } from 'requestmodal/ResponseModel';
import { empty } from 'rxjs';
import { appDTO } from 'src/dto/appDTO';
import { clienDTO } from 'src/dto/clientDTO';
import { featureDTO } from 'src/dto/featureDTO';
import { roleDTO } from 'src/dto/roleTable.dto';
import { Admin } from 'src/entity/admin.entity';
import { App } from 'src/entity/app.entity';
import { Client } from 'src/entity/client.entity';
import { Crud } from 'src/entity/crud.entity';
import { Feature } from 'src/entity/features.entity';
import { Role } from 'src/entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
        @InjectRepository(Crud) private readonly crudRepository: Repository<Crud>,
        @InjectRepository(App) private readonly appRepository: Repository<App>,
        @InjectRepository(Feature) private readonly featureRepository: Repository<Feature>,
      ){}

    
    async register(data :any) {
        return this.adminRepository.save(data)
      }

      async findOne(condition: any): Promise<any>{
        console.log("inside findone");
        
        return this.adminRepository.findOne(condition)
      }

      async addRoletoadmin(data :any) {
         this.adminRepository.save(data)
        return this.roleRepository.save(data)
      }

      async addRoletoRole(@Body() body: any): Promise<ResponseModel<roleDTO>> {
        const cms: Role = new Role()

        cms.rolename=body.rolename
        cms.adminname=body.adminname
        cms.methodname=body.methodname

        await this.roleRepository.save(cms)
        const empDto:ResponseModel<roleDTO>= this.entityToDTO(cms)
        JSON.stringify(empDto)
        return empDto
       // return this.roleRepository.save(body)
      }

      async createone(@Body() body: any): Promise<ResponseModel<clienDTO>>{

        console.log(body.id);
       // const cms: Role = await this.roleRepository.findOne(body.id)
       const cms: Client = new Client()
        console.log(body.id);
      
        cms.name=body.name
        cms.adminname=body.adminname
        cms.roleid=body.roleid
        
      await this.clientRepository.save(cms)
      
      const empDto:ResponseModel<clienDTO>= this.entityToDTOClient(cms)
      JSON.stringify(empDto)
      return empDto
      
      }

      async addclient(data :any) {

        return this.clientRepository.save(data)
      }

      
      async addCrud(data :any) {

        return this.crudRepository.save(data)
      }
async getRoles(){

  const emps: any[] = await this.roleRepository.find()
  //console.log("sathya")
  const empsdto: roleDTO[] = emps.map(x=> this.entityToDTO(x))

  return empsdto
}
private entityToDTO(data : Role): ResponseModel<clienDTO>{

  const clientdto = new ResponseModel<clienDTO>()
   clientdto.id=data.id
  clientdto.rolename = data.rolename
  clientdto.adminname = data.adminname
  clientdto.methodname = data.methodname

  return clientdto
}

private entityToDTOClient(data : Client): ResponseModel<clienDTO>{

  const clientdto = new ResponseModel<clienDTO>();
   clientdto.id=data.id
  clientdto.name = data.name
  clientdto.adminname = data.adminname
  clientdto.roleid = data.roleid
  return clientdto
}



async updateRoles(@Body()body:ResponseModel<clienDTO>): Promise<ResponseModel<clienDTO>>
{
  console.log(body.id);
  const cms: Role = await this.getOne(body.id)
  //console.log(body.id);
//cms.id=body.id
  cms.rolename=body.rolename
  cms.adminname=body.adminname
  cms.methodname=body.methodname
  console.log(cms.methodname);
await this.roleRepository.save(cms)

const empDto: ResponseModel<clienDTO> = this.entityToDTO(cms)
 return empDto
//const empDto: roleDTO = this.entityToDTO(cms)
//return empDto
}
      
public async getOne(empid: number)
{
    const emp: Role = await this.roleRepository.findOne(empid)
  // console.log("sathya")
    if(!emp) throw new NotFoundException(`Role with ID ${empid} was not found`)
    let empdto: roleDTO = this.entityToDTO(emp)

    return empdto

}

/////////////////////////////////////////////////////////////////////
// App 
///////////////////////////////////////////////////////////////////////


private entityToDTOApp(data : App): ResponseModel<appDTO>{

  const clientdto = new ResponseModel<appDTO>();
   clientdto.id=data.id
  clientdto.appname = data.appname
  clientdto.adminname = data.adminname
  clientdto.appdesciption = data.appdesciption
  return clientdto
}

async addApp(@Body() body: any): Promise<ResponseModel<appDTO>>{

  console.log(body.id);
 // const cms: Role = await this.roleRepository.findOne(body.id)
 const cms: App = new App()
  console.log(body.id);

  cms.appname=body.appname
  cms.adminname=body.adminname
  cms.appdesciption=body.appdesciption
  
await this.appRepository.save(cms)

const empDto:ResponseModel<appDTO>= this.entityToDTOApp(cms)
JSON.stringify(empDto)
return empDto

}

async addFeature(@Body() body: any): Promise<ResponseModel<featureDTO>>{

  console.log(body.id);
 // const cms: Role = await this.roleRepository.findOne(body.id)
 const cms: Feature = new Feature()
  console.log(body.id);

  cms.featurename=body.featurename
  cms.adminname=body.adminname
  cms.featuredesciption=body.featuredesciption
 // cms.appid=body.appid
await this.featureRepository.save(cms)

const empDto:ResponseModel<featureDTO>= this.entityToDTOfeature(cms)
JSON.stringify(empDto)
return empDto

}

private entityToDTOfeature(data : Feature): ResponseModel<featureDTO>{

  const clientdto = new ResponseModel<featureDTO>();
   clientdto.id=data.id
  clientdto.featurename = data.featurename
  clientdto.adminname = data.adminname
  clientdto.featuredesciption = data.featuredesciption
  return clientdto
}


public async deleterole(@Body()body:ResponseModel<roleDTO>): Promise<ResponseModel<roleDTO>>{
  let emp: Role = await this.getOne(body.id)
  emp.id=body.id
  await this.roleRepository.remove(emp)

  const empDto: ResponseModel<roleDTO> = this.entityToDTORole(emp)
 return empDto

}

private entityToDTORole(data : Role): ResponseModel<roleDTO>{

  const clientdto = new ResponseModel<roleDTO>()
   clientdto.id=data.id
  clientdto.rolename = data.rolename
  clientdto.adminname = data.adminname
  clientdto.methodname = data.methodname

  return clientdto
}



}
