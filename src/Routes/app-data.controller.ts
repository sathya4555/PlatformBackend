import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Message } from 'requestmodal/Message';
import { RequestModel } from 'requestmodal/RequestModel';
import { ResponseModel } from 'requestmodal/ResponseModel';
import { AdminService } from 'src/facade/admin.service';
import { appDTO } from 'src/dto/appDTO';
import { clienDTO } from 'src/dto/clientDTO';
import { SNS_SQS } from 'Submodules/SNS_SQS';
import { AppDataService } from '../facade/app-data.service';
import { featureDTO } from 'src/dto/featureDTO';

@Controller('app-data')
export class AppDataController {

    constructor(private readonly appService: AppDataService,
        private jwtService: JwtService
    ) { }

    private sns_sqs = SNS_SQS.getInstance();
    private topicArray = ['STUDENT_ADD', 'EMPLOYEE_UPDATE', 'EMPLOYEE_DELETE', 'ROLE_ADD', 'ROLE_UPDATE', 'APP_ADD', 'FEATURE_ADD', "APP_UPDATE", "APP_DELETE", 'FEATURE_DELETE', 'FEATURE_UPDATE'];
    private serviceName = ['STUDENTCOURSE_SERVICE', 'STUDENTCOURSE_SERVICE', 'STUDENTCOURSE_SERVICE', "STUDENTCOURSE_SERVICE", "STUDENTCOURSE_SERVICE", 'STUDENTCOURSE_SERVICE', "STUDENTCOURSE_SERVICE", "STUDENTCOURSE_SERVICE", 'STUDENTCOURSE_SERVICE', "STUDENTCOURSE_SERVICE", 'STUDENTCOURSE_SERVICE'];


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
                        let responseModelOfProductDto: ResponseModel<any> = null;
                        // let responseModelOfProductDto1: ResponseModel<featureDTO> = null;
                        console.log(`listening to  ${value} topic.....result is....`);
                        // ToDo :- add a method for removing queue message from queue....
                        switch (value) {

                            case 'APP_ADD':
                                console.log("Inside APP ADD Topic");
                                responseModelOfProductDto = await this.addApp(result["message"]);
                                break;
                            case 'FEATURE_ADD':
                                console.log("Inside APP ADD Topic");
                                responseModelOfProductDto = await this.addFeature(result["message"]);
                                break;

                            case 'APP_UPDATE':
                                console.log("Inside APP UPDATE Topic");
                                responseModelOfProductDto = await this.editRoles(result["message"]);
                                break;
                            case 'APP_DELETE':
                                console.log("Inside APP DELETE Topic");
                                responseModelOfProductDto = await this.deleteApp(result["message"]);
                                break;

                                case 'FEATURE_UPDATE':
                                    console.log("Inside FEATURE UPDATE Topic");
                                    responseModelOfProductDto = await this.editfeature(result["message"]);
                                    break;






                        }

                        console.log("Result of aws of GroupRoutes  is...." + JSON.stringify(result));
                        let requestModelOfProductDto: RequestModel<clienDTO> = result["message"];

                        //console.log("resul;t",result);

                        console.log("socketid", requestModelOfProductDto.SocketId)

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
                        for (let index = 0; index < result.OnSuccessTopicsToPush.length; index++) {
                          const element = result.OnSuccessTopicsToPush[index];
                          let errorResult: ResponseModel<clienDTO> = new ResponseModel<clienDTO>(null, null, null, null, null, null, null, null, null);;
                          let requestModelOfProductDto: RequestModel<clienDTO> = result["message"];
                          
                          
                          errorResult.setSocketId(requestModelOfProductDto.SocketId)
                          errorResult.setStatus(new Message("300", "Cannot complete request, please check your input", null));
                          console.log('sockert is inside catch',requestModelOfProductDto.SocketId);
                          errorResult.setStatus(new Message("500", error, null))
            
            // console.log(errorResult);
            
                          this.sns_sqs.publishMessageToTopic(element, errorResult);
                        }
                    }
                }
            })())
        }

    }


    @Post('addapp')
    public async addApp(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> {

        //console.log("Inside CreateProduct of controller....body id" + JSON.stringify(body));
        const result = await this.appService.addApp(body)
        console.log("insisadajdgejdgjhhjdasfs");

        return result
    }



    @Post('addfeature')
    public async addFeature(@Body() body: ResponseModel<any>): Promise<ResponseModel<any>> {
try{
 //console.log("Inside CreateProduct of controller....body id" + JSON.stringify(body));
 const result = await this.appService.addFeature(body)
//  console.log("insisadajdgejdgjhhjdasfs");
 return result

}catch(error:any){
    console.log('inside add client catch',error);
    throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
}
       
    }



    @Get('getApps')
    async getRoles() {
        const result = await this.appService.getApps();
        return result
    }

    @Put('editapps')
    async editRoles(@Body() body: ResponseModel<appDTO>): Promise<ResponseModel<appDTO>> {
        JSON.stringify(body)
        const result1 = await this.appService.updateApps(body)
        return result1
    }


    @Put('editfeature')
    async editfeature(@Body() body: ResponseModel<featureDTO>): Promise<ResponseModel<featureDTO>> {
        JSON.stringify(body)
        const result1 = await this.appService.updateFeature(body)
        return result1
    }



    @Delete('deleteapp')
    // @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteApp(@Body() body: ResponseModel<appDTO>): Promise<ResponseModel<appDTO>> {
        const result = await this.appService.deleteApp(body)
        return result
    }

    @Get('getfeatures')
    async getfeature() {
        const result = await this.appService.getfeature();
        return result
    }


    @Delete('deletefeature')
    // @HttpCode(HttpStatus.NO_CONTENT)
    public async deletefeature(@Body() body: ResponseModel<featureDTO>): Promise<ResponseModel<featureDTO>> {
        const result = await this.appService.deletefeature(body)
        return result
    }

}
