import { ServiceOperationResultType } from "./ServiceOperationResultType";
import { Message } from "./Message";
import { DtoBase } from "./DtoBase";
import { App } from "src/entity/app.entity";
import { Role } from "src/entity/role.entity";
export class ResponseModel<TDto extends DtoBase> {
 
  private RequestId: string;
  private DataCollection: TDto[] | null;
  private ResultType: number;
  private Status: Message | null;
  private Messages: Array<Message> | null;
  public zoomToken: string;

  private SocketId: string;

  private CommunityUrl: string;
   // name: string;
    id: number;
    public name: string;
    public roleid: string;
    public adminname:  string;
  public rolename: string;
  public methodname: string[]
public app:App
  public appname: string
  public appdesciption:string

  public featurename:string
  public featuredesciption:string

  //
  public approlename:string
  public rolepermission:string
  public role:Role
  constructor(
    requestId?: string,
    data?: Array<TDto> | null,
    resultType?: ServiceOperationResultType,
    errorCode?: string,
    statusMessage?: string | null,
    localizedStatusMessage?: string | null,
    message?: Array<Message> | null,
    socketId?: string,
    communityUrl?: string,

    name?: string,
rolename?:string,
    adminname?: string,
methodname?:string[],
    roleid?: string,  
    appname?: string,
     appdesciption?:string,
app?:App,
     featurename?:string,
     featuredesciption?:string,
approlename?:string,
rolepermission?:string,
role?:Role
  ) {
    this.RequestId = requestId;
    this.DataCollection = data;
    this.ResultType = resultType;
    this.Status = new Message(
      errorCode,
      statusMessage,
      localizedStatusMessage
    );
    this.Messages = message;
    this.SocketId = socketId;
    this.CommunityUrl = communityUrl;
    this.name=name
    this.roleid=roleid
    this.adminname=adminname
    this.rolename=rolename
    this.methodname=methodname
    this.appname=appname
    this.appdesciption=appdesciption
    this.featuredesciption=featuredesciption
    this.featurename=featurename
    this.approlename=approlename
    this.rolepermission=rolepermission
    this.role=role
    this.app=app
  }

  public getRequestId(): string {
    return this.RequestId;
  }

  // public setErrorCode(code:string): void{
  //   this.Status.setErrorCode(code);
  // }
  public setapprole(RequestId: string): void {
    this.approlename = RequestId;
  }

  public setapprolpermissions(RequestId: string): void {
    this.rolepermission = RequestId;
  }

  public setRoleforignkey(RequestId: Role): void {
    this.role = RequestId;
  }
  

  

  public setappID(RequestId: App): void {
    this.app = RequestId;
  }
  public setfeaturename(RequestId: string): void {
    this.featurename = RequestId;
  }
  public serfeaturedesc(RequestId: string): void {
    this.featuredesciption = RequestId;
  }



  public setappname(RequestId: string): void {
    this.appname = RequestId;
  }

  public setAppdescription(RequestId: string): void {
    this.appdesciption = RequestId;
  }

  public Setname(RequestId: string): void {
    this.name = RequestId;
  }

  public setRole(RequestId: string): void {
    this.roleid = RequestId;
  }
  public setRolename(RequestId: string): void {
    this.rolename = RequestId;
  }
  public setmethodname(RequestId: string): void {
    for (var i = 0; i < this.methodname.length; i++) {
    this.methodname[i] = RequestId;
  }}


  public setAdmin(RequestId: string): void {
    this.adminname = RequestId;
  }
  public setRequestId(RequestId: string): void {
    this.RequestId = RequestId;
  }

  public getCommunityUrl(): string {
    return this.CommunityUrl;
  }


  public setMessage(statusCode:string,input_message:string):void{
    let message = new Message(statusCode,input_message,null);
    this.Status = message;
  }

  public setCommunityUrl(communityUrl: string) {
    this.CommunityUrl = communityUrl;
  }

  public getDataCollection(): TDto[] | null {
    return this.DataCollection;
  }

  public setDataCollection(DataCollection: TDto[]): void {
    this.DataCollection = DataCollection;
  }

  public getResultType(): number {
    return this.ResultType;
  }

  public getData(): TDto | null {
    let t_temp =
      this.DataCollection != null && this.DataCollection[0] != null
        ? (this.DataCollection[0] as TDto)
        : null;
    return t_temp;
  }

  //TODO
  // public getDerivedType<D>(): ResponseModel<D>{
  //     Object.create()
  // }

  // public ResponseModel<D> ToDerivedType<D>()
  //         where D : class
  //     {
  //         var baseResponseModel = this;
  //         var derivedResponseModel = new ResponseModel<D>(baseResponseModel.DataCollection.Cast<D>());
  //         derivedResponseModel.RequestId = baseResponseModel.RequestId;
  //         derivedResponseModel.ResultType = baseResponseModel.ResultType;
  //         derivedResponseModel.Messages = baseResponseModel.Messages;
  //         derivedResponseModel.Status = baseResponseModel.Status;

  //         return derivedResponseModel;
  //     }

  // public setResultType(ResultType: ServiceOperationResultType): void {
  //     this.ResultType = ResultType;
  // }

  // public getStatus(): Message {
  //     return this.Status;
  // }
  public getSocketId(): string {
    return this.SocketId;
  }
  public setSocketId(socketId: string): void {
    this.SocketId = socketId;
  }
  public setStatus(Status: Message): void {
    this.Status = Status;
  }

  public getMessages(): Array<Message> | null {
    return this.Messages;
  }

  // public setMessages(Messages: Array<Message>): void {
  //     this.Messages = Messages;
  // }

  // Get(id:number):ResponseModel<TDto>|null
  CreateFailureResult(
    requestId: string,
    message: string,
    messages: Array<Message>,
    localizedMessage: string = "",
    validationCode: string = "",
    socketId: string = "",
    communityUrl: string = ""
  ): ResponseModel<TDto> | null {
    return new ResponseModel<TDto>(
      requestId,
      null,
      ServiceOperationResultType.failure,
      validationCode,
      message,
      localizedMessage,
      messages,
      socketId,
      communityUrl
    );
    //return new ResponseModel<T>(requestId, null
  }
  CreateErrorResult(
    requestId: string,
    errorCode: string,
    message: string = "",
    localizedMessage: string = "",
    socketId: string = "",
    communityUrl: string = ""
  ): ResponseModel<TDto> {
    return new ResponseModel<TDto>(
      requestId,
      null,
      ServiceOperationResultType.error,
      errorCode,
      message,
      localizedMessage,
      null,
      socketId,
      communityUrl
    );
  }
  // CreateErrorResult1(requestId:string , errorCode:string , message:string,localizedMessage:string=""):ResponseModel<T>
  // {
  //     return new ResponseModel<T>(requestId, null, ServiceOperationResultType.error, errorCode, "","", null);
  // }
  CreateSuccessResult(
    requestId: string,
    data: Array<TDto>,
    message: string | null,
    messages: Array<Message> | null,
    localizedMessage: string | null,
    socketId: string = "",
    communityUrl: string = ""
  ) {
    return new ResponseModel<TDto>(
      requestId,
      data,
      ServiceOperationResultType.success,
      "200",
      message,
      localizedMessage != null ? localizedMessage : null,
      messages,
      socketId,
      communityUrl
    );
  }

  public echo<D>(arg: D): D {
    return arg;
  }

  // public ToDerivedType<D>

  // public ResponseModel<D> ToDerivedType<D>()
  //         where D : class
  //     {
  //         var baseResponseModel = this;
  //         var derivedResponseModel = new ResponseModel<D>(baseResponseModel.DataCollection.Cast<D>());
  //         derivedResponseModel.RequestId = baseResponseModel.RequestId;
  //         derivedResponseModel.ResultType = baseResponseModel.ResultType;
  //         derivedResponseModel.Messages = baseResponseModel.Messages;
  //         derivedResponseModel.Status = baseResponseModel.Status;

  //         return derivedResponseModel;
  //     }
}
