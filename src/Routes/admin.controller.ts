import { BadRequestException, Body, Controller, Get, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../facade/admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
// import * as cookieParser from 'cookie-parser';
import {Response, Request} from 'express';
import { Message } from 'requestmodal/Message';
// import { RequestModel } from 'requestmodal/RequestModel';
// import { ResponseModel } from 'requestmodal/ResponseModel';
import { SNS_SQS } from 'Submodules/SNS_SQS';
import { clienDTO } from 'src/dto/clientDTO';
import { RequestModel } from 'requestmodal/RequestModel';
import { ResponseModel } from 'requestmodal/ResponseModel';
import { roleDTO } from 'src/dto/roleTable.dto';

@Controller('component')
export class AdminController {

    constructor(private readonly appService: AdminService,
        private jwtService: JwtService
      ) { }
    

      

  private sns_sqs = SNS_SQS.getInstance();
  private topicArray = ['STUDENT_ADD', 'EMPLOYEE_UPDATE', 'EMPLOYEE_DELETE','ROLE_ADD','ROLE_UPDATE'];
  private serviceName = ['STUDENTCOURSE_SERVICE', 'STUDENTCOURSE_SERVICE', 'STUDENTCOURSE_SERVICE',"STUDENTCOURSE_SERVICE","STUDENTCOURSE_SERVICE",'STUDENTCOURSE_SERVICE'];

  onModuleInit() {
    console.log("inside mod")
    for (var i = 0; i < this.topicArray.length; i++) {
      this.sns_sqs.listenToService(this.topicArray[i], this.serviceName[i], (() => {
        console.log("inside LLTS")
        let value = this.topicArray[i];
        return async (result) => {
          // console.log("inside we")
          console.log("Result is........" + JSON.stringify(result));
          try {
            let responseModelOfProductDto: ResponseModel<clienDTO> = null;
            console.log(`listening to  ${value} topic.....result is....`);
            // ToDo :- add a method for removing queue message from queue....
            switch (value) {
              case 'STUDENT_ADD':
                console.log("Inside STUDENT_ADD Topic");
                responseModelOfProductDto = await this.createOne(result["message"]);
                break;
                case 'ROLE_ADD':
                  console.log("Inside ROLE ADD Topic");
                  responseModelOfProductDto = await this.addRole(result["message"]);
                  break;
                  case 'ROLE_UPDATE':
                    console.log("Inside ROLE UPDATE Topic");
                    responseModelOfProductDto = await this.editRoles(result["message"]);
                    break;
                   
            
          

            }

            console.log("Result of aws of GroupRoutes  is...." + JSON.stringify(result));
            let requestModelOfProductDto: RequestModel<clienDTO> = result["message"];

            //console.log("resul;t",result);
            
           console.log("socketid",requestModelOfProductDto.SocketId)
            
           responseModelOfProductDto.setSocketId(requestModelOfProductDto.SocketId)
           responseModelOfProductDto.setCommunityUrl(requestModelOfProductDto.CommunityUrl);
           responseModelOfProductDto.setRequestId(requestModelOfProductDto.RequestGuid);
           responseModelOfProductDto.setStatus(new Message("200", "Request Completed", null));

            for (let index = 0; index < result.OnSuccessTopicsToPush.length; index++) {
              const element = result.OnSuccessTopicsToPush[index];
              console.log("ELEMENT: ", JSON.stringify(responseModelOfProductDto));
              this.sns_sqs.publishMessageToTopic(element, responseModelOfProductDto)
            }
          }
          catch (error) {
            console.log("Inside Catch.........");
            console.log(error, result);
            for (let index = 0; index < result.OnFailureTopicsToPush.length; index++) {
              const element = result.OnFailureTopicsToPush[index];
              let errorResult: ResponseModel<clienDTO> = new ResponseModel<clienDTO>(null, null, null, null, null, null, null, null, null);;
              errorResult.setStatus(new Message("500", error, null))

// console.log(errorResult);

              this.sns_sqs.publishMessageToTopic(element, errorResult);
            }
          }
        }
      })())
    }

  }

    @Post('register')
    async register(
      @Body('name') name: string,
      @Body('password') password: string,
    ) {
      const hashedPassword = await bcrypt.hash(password, 12)
  
      const user = await this.appService.register({
        name,
        password: hashedPassword
    });
}

@Post('')
public async createOne(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> {

  //console.log("Inside CreateProduct of controller....body id" + JSON.stringify(body));
  const result = await this.appService.createone(body)

  return result
}

@Get('user')
async user(@Req() request: Request) {
    try {
        const cookie = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);

        if (!data) {
            throw new UnauthorizedException();
        }

        const user = await this.appService.findOne({id: data['id']});

        const {password, ...result} = user;

        return result;
    } catch (e) {
        throw new UnauthorizedException();
    }
}

@Post('logout')
async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {
        message: 'success'
    }
}

@Post('login')
async login(
  @Body('name') name: string,
  @Body('password') password: string,
  @Res({passthrough: true}) response: Response
) {
  const user = await this.appService.findOne({ name })

  if (!user) {
    throw new BadRequestException('User not Found')
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new BadRequestException('invalid credentials');



  }
  const jwt = await this.jwtService.signAsync({ id: user.id });

  response.cookie('jwt', jwt, {httpOnly: true});
  return {
    message: 'success'
};
}


@Post('addrole')
public async addRole(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> {

  //console.log("Inside CreateProduct of controller....body id" + JSON.stringify(body));
  const result = await this.appService.addRoletoRole(body)

  return result
}

// async addRole(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> 
//     // @Req() request: Request,
//     // @Body('role') roleid: string,
//     //  @Body('clientid') clientid: string,
//     //  @Body('methodname') methodname: string[],
//    // @Req() request: Request,
//     )
    
//     {

//     const adminname=clientid
//           const rolename=roleid 
//         const user = await this.appService.addRoletoRole({
//             rolename,
//             adminname,
//             methodname
//         });

//         // const id=roleid
    

//         // const userRole = await this.appService.addRoletoRole({
//         //     id,
          
//         // });

//         return user
  

// }



@Post('addclient')
async adClient(
    @Body('name') name: string,
     @Body('adminname') adminname: string,
     @Body('role') roleid: string,

   // @Req() request: Request,
    
    )
    
    {

   
        const user = await this.appService.addclient({
          name,
          adminname,
          roleid
        });

        // const id=roleid
    

        // const userRole = await this.appService.addRoletoRole({
        //     id,
          
        // });

        return user
     

}

@Post('crud')
async addCrud( @Body('methodname') methodname: string,
@Body('methodnumber') methodnumber: number, ){
    const user = await this.appService.addCrud({
        methodname,
        methodnumber
    });
return user
}


@Get('getRoles')
async getRoles(){
   const result= await this.appService.getRoles();
    return result
}


@Put('editrole')
async editRoles(@Body() body: ResponseModel<clienDTO>): Promise<ResponseModel<clienDTO>>{
  JSON.stringify(body)
  const result1= await this.appService.updateRoles(body)
  return result1
}

////////////////////////////////////////App


@Post('addapp')
public async addApp(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> {

  //console.log("Inside CreateProduct of controller....body id" + JSON.stringify(body));
  const result = await this.appService.addApp(body)

  return result
}



@Post('addapp')
public async addFeature(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> {

  //console.log("Inside CreateProduct of controller....body id" + JSON.stringify(body));
  const result = await this.appService.addFeature(body)

  return result
}

}
