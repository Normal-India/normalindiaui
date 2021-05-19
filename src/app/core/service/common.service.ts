import { HttpMethod } from './../enums/http-handlers';
import { AlertService } from './alert.service';
import { AlertInfo } from './../enums/alert-info';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  currentMessage = new BehaviorSubject(null);

  constructor(private apiService: ApiService,
    private appService: AppService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_message: AngularFireMessaging) => {
        _message.onMessage = _message.onMessage.bind(_message);
        _message.onTokenRefresh = _message.onTokenRefresh.bind(_message);
      }
    )
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        return token
        console.log(token);
      }
    )
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("Message Received - ", payload);
        this.currentMessage.next(payload);
      }
    )
  }



  apiHandler(methodType, url, requestObj) {
    switch (methodType) {
      case HttpMethod.POST:
        return this.apiService.commonPostHandler(url, requestObj);
      case HttpMethod.PUT:
        return this.apiService.commonPutHandler(url, requestObj);
      case HttpMethod.DELETE:
        return this.apiService.commonDeleteHandler(url);
      case HttpMethod.GET:
        return this.apiService.commonGetHandler(url);
    }
  }
  // common Post Api need to use in all screens
  commonApiCall(url, methodType, requestObj, callBack) {
    this.spinner.show();
    this.apiHandler(methodType, url, requestObj).subscribe(
      (res) => {
        // if (
        //   !this.appService.checkNullOrUndefined(res) &&
        //   res.hasOwnProperty('response')
        // ) {
        //   if (res.hasOwnProperty('isSuccess') && res.isSuccess) {
        //     this.getMessages(res, AlertInfo.SUCCESS, methodType);

        //     callBack(res.response, true);
        //   } else if (res.hasOwnProperty('isSuccess') && !res.isSuccess) {
        //     this.getMessages(res, AlertInfo.ERROR, methodType);
        //     // this.spinner.hide();
        //     callBack(res.response, false);
        //   }
        // }
        if (!this.appService.checkNullOrUndefined(res)) {
          callBack(res, true)
        } else {
          callBack(res, false)
        }

      },
      (error) => {
        // this.spinner.hide();
        callBack(null, false);
        this.alertService.showMessage(AlertInfo.ERROR, error);
      }
    );
  }



  private getMessages(res: any, type, methodType) {
    if (methodType == HttpMethod.GET && type == AlertInfo.SUCCESS) {
      return;
    }
    if (
      !this.appService.checkNullOrUndefined(res.endUserMessage) &&
      res.endUserMessage != ''
    ) {
      this.alertService.showMessage(type, res.endUserMessage);
    }
  }


}
