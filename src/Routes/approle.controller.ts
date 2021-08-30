import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Message } from 'requestmodal/Message';
import { RequestModel } from 'requestmodal/RequestModel';
import { ResponseModel } from 'requestmodal/ResponseModel';
import { approleDTO } from 'src/dto/appRoleDTO';
import { clienDTO } from 'src/dto/clientDTO';
import { AdminService } from 'src/facade/admin.service';
import { SNS_SQS } from 'Submodules/SNS_SQS';
import { ApproleService } from '../facade/approle.service';

@Controller('approle')
export class ApproleController {


    
    constructor(private readonly appService: ApproleService,
        private jwtService: JwtService
      ) { }
    

      

  private sns_sqs = SNS_SQS.getInstance();
  private topicArray = ['APPROLE_ADD','APPROLE_UPDATE','APPROLE_DELETE'];
  private serviceName = ['STUDENTCOURSE_SERVICE','STUDENTCOURSE_SERVICE'];

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
            let responseModelOfProductDto: ResponseModel<approleDTO> = null;
            console.log(`listening to  ${value} topic.....result is....`);
            // ToDo :- add a method for removing queue message from queue....
            switch (value) {
              case 'APPROLE_ADD':
                console.log("Inside STUDENT_ADD Topic");
                responseModelOfProductDto = await this.addRole(result["message"]);
                break;
                case 'APPROLE_UPDATE':
                  console.log("Inside ROLE ADD Topic");
                  responseModelOfProductDto = await this.editRoles(result["message"]);
                  break;

                  case 'APPROLE_DELETE':
                    console.log("Inside ROLE ADD Topic");
                    responseModelOfProductDto = await this.deletefeature(result["message"]);
                    break;
                //   case 'ROLE_UPDATE':
                //     console.log("Inside ROLE UPDATE Topic");
                //     responseModelOfProductDto = await this.editRoles(result["message"]);
                //     break;
                //     case 'ROLE_DELETE':
                //       console.log("Inside ROLE DELETE Topic");
                //       responseModelOfProductDto = await this.deletefeature(result["message"]);
                //       break;
                   
            
          

            }

            console.log("Result of aws of GroupRoutes  is...." + JSON.stringify(result));
            let requestModelOfProductDto: RequestModel<approleDTO> = result["message"];

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
              let errorResult: ResponseModel<approleDTO> = new ResponseModel<approleDTO>(null, null, null, null, null, null, null, null, null);;
              errorResult.setStatus(new Message("500", error, null))

// console.log(errorResult);

              this.sns_sqs.publishMessageToTopic(element, errorResult);
            }
          }
        }
      })())
    }

  }

  @Post('addrole')
  public async addRole(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> {
  
    //console.log("Inside CreateProduct of controller....body id" + JSON.stringify(body));
    const result = await this.appService.addAppRole(body)
  
    return result
  }




  @Get('getappRoles')
  async getRoles(){
     const result= await this.appService.getappRoles();
      return result
  }
  

  @Put('editapprole')
  async editRoles(@Body() body: ResponseModel<approleDTO>): Promise<ResponseModel<approleDTO>>{
    JSON.stringify(body)
    const result1= await this.appService.updateAppRoles(body)
    return result1
  }


  @Delete('deleteapprole')
// @HttpCode(HttpStatus.NO_CONTENT)
public async deletefeature(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>>{
    const result = await this.appService.deleteapprole(body)
    return  result
}

@Post('sort')
// @HttpCode(HttpStatus.NO_CONTENT)
public async Sort(@Body() body: ResponseModel<approleDTO>): Promise<ResponseModel<approleDTO>>{
    // const result = await this.appService.deleterole(body)
    const result = await this.appService.sort(body)
    return  result
}




}
