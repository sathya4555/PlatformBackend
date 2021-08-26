import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseModel } from 'requestmodal/ResponseModel';
import { appDTO } from 'src/dto/appDTO';
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
export class AppDataService {

    constructor(
        @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
        @InjectRepository(Crud) private readonly crudRepository: Repository<Crud>,
        @InjectRepository(App) private readonly appRepository: Repository<App>,
        @InjectRepository(Feature) private readonly featureRepository: Repository<Feature>,
      ){}

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
        cms.app=body.app
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
        clientdto.app = data.app
        return clientdto
      }

      async getApps(){

        const emps: any[] = await this.appRepository.find()
        //console.log("sathya")
        const empsdto: appDTO[] = emps.map(x=> this.entityToDTOApp(x))
      
        return empsdto
      }

      async updateApps(@Body()body:ResponseModel<appDTO>): Promise<ResponseModel<appDTO>>
{
  console.log(body.id);
  const cms: App = await this.getOne(body.id)
  //console.log(body.id);
//cms.id=body.id
  cms.appname=body.appname
  cms.adminname=body.adminname
  cms.appdesciption=body.appdesciption
 // console.log(cms.methodname);
await this.appRepository.save(cms)

const empDto: ResponseModel<appDTO> = this.entityToDTOApp(cms)
 return empDto
//const empDto: roleDTO = this.entityToDTO(cms)
//return empDto
}

      
public async getOne(empid: number)
{
    const emp: App = await this.appRepository.findOne(empid)
  // console.log("sathya")
    if(!emp) throw new NotFoundException(`App with ID ${empid} was not found`)
    let empdto: any = this.entityToDTOApp(emp)

    return empdto

}
public async deleteApp(@Body()body:ResponseModel<appDTO>): Promise<ResponseModel<appDTO>>{
  let emp: App = await this.getOne(body.id)
  emp.id=body.id
  await this.appRepository.remove(emp)

  const empDto: ResponseModel<appDTO> = this.entityToDTOApp(emp)
 return empDto

}



async getfeature(){

  const emps: any[] = await this.featureRepository.find()
  //console.log("sathya")
  // console.log(emps.app);
  const empsdto: featureDTO[] = emps.map(x=> this.entityToDTOfeature(x))


  return empsdto
}

public async deletefeature(@Body()body:ResponseModel<featureDTO>): Promise<ResponseModel<featureDTO>>{
  let emp: Feature = await this.getOnefeature(body.id)
  emp.id=body.id
  await this.featureRepository.remove(emp)

  const empDto: ResponseModel<featureDTO> = this.entityToDTOfeature(emp)
 return empDto

}


public async getOnefeature(empid: number)
{
    const emp: Feature = await this.featureRepository.findOne(empid)
  // console.log("sathya")
    if(!emp) throw new NotFoundException(`Feature with ID ${empid} was not found`)
    let empdto: any = this.entityToDTOfeature(emp)

    return empdto

}


async updateFeature(@Body()body:ResponseModel<featureDTO>): Promise<ResponseModel<featureDTO>>
{
  console.log(body.id);
  const cms: Feature = await this.getOnefeature(body.id)
  //console.log(body.id);
//cms.id=body.id
  cms.featurename=body.featurename
  cms.adminname=body.adminname
  cms.featuredesciption=body.featuredesciption
 // console.log(cms.methodname);
await this.featureRepository.save(cms)

const empDto: ResponseModel<featureDTO> = this.entityToDTOfeature(cms)
 return empDto
//const empDto: roleDTO = this.entityToDTO(cms)
//return empDto
}




}
