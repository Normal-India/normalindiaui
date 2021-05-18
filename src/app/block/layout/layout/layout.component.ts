import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../core/service/common.service';
import { HttpMethod } from './../../../core/enums/http-handlers';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { COMPONENTS } from '../../../core/enums/urls';

import { HOSPITAL, DONOR, VACCINE } from '../../../core/enums/urls';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  params: HttpParams;
  listOfComponents = [];
  childLists = [];
  selectedMode = 'Bed';
  selectedChildMode = 'All';

  submitted = false;
  listOfStates = [];
  listOfDistrict = [];
  form: FormGroup;
  pinForm: FormGroup;
  modalRef: BsModalRef;
  reportForm: FormGroup;
  vaccineReportForm: FormGroup;
  donorPlasmaForm: FormGroup;
  notifyPlasmaForm: FormGroup;
  notifyBedForm: FormGroup;
  newReportPlasmaForm: FormGroup;
  notifyVaccineForm: FormGroup;
  selectedHospital: any;

  filterList = [];
  listOfDonor = ['donor']
  listOfmyAge = ['18', '19', '20']
  phoneNumber = "^((\\+91-?)|0)?[0-9]{10}$";

  constructor(private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      state: new FormControl('', Validators.required),
      district: new FormControl(''),
      date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
    });
    this.pinForm = new FormGroup({
      pinCode: new FormControl('', Validators.required),
      date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    });

    this.createReportForm();
    this.vaccineRepForm();
    this.newDonorPlasmaForm();
    this.notifyMyPlasmaForm();
    this.notifyMyBedForm();
    this.newReportPlasma();
    this.notifyVaccine();
    this.getComponentdata();
    this.getStates();
  }

  createReportForm() {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.pattern(this.phoneNumber)]],
      regularBed: [false, [Validators.required]],
      icuBed: [false, [Validators.required]],
      //oxygenBed: [false, [Validators.required]],
      // vaccine: [false, [Validators.required]],
      regularBedCount: ['', [Validators.required]],
      icuBedCount: ['', [Validators.required]],
      //oxygenBedCount: ['', [Validators.required]],
      // vaccineCount: ['', [Validators.required]],
      comment: ['']
    });
  }

  vaccineRepForm() {
    this.vaccineReportForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.phoneNumber)]],
      vaccineAvailablity: [false, [Validators.required]],
      vaccineAvailablityCount: [false, [Validators.required]],
      forthyFivePlus: [false, [Validators.required]],
      vaccineType: ['', [Validators.required]],
      price: ['', [Validators.required]],
      comment: ['']
    });
  }

  newDonorPlasmaForm() {
    this.donorPlasmaForm = this.fb.group({
      id: [0, [Validators.required]], //
      name: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.pattern(this.phoneNumber)]], //
      state: ['', [Validators.required]],
      city: ['', [Validators.required]], //
      donortype: ['', [Validators.required]], //
      pincode: ['', [Validators.required]], //
      bloodgroup: ['', [Validators.required]], //
      age: [''], //
      posdate: ['', [Validators.required]]
    });
  }

  notifyMyPlasmaForm() {
    this.notifyPlasmaForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.phoneNumber)]],
      state: ['', [Validators.required]],
      // district: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]]
    });
  }

  notifyMyBedForm() {
    this.notifyBedForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.phoneNumber)]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      selectdeb: ['', [Validators.required]]
    });
  }

  newReportPlasma() {
    this.newReportPlasmaForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required,Validators.pattern(this.phoneNumber)]],
      aPlus: ['', [Validators.required]],
      aPlusCount: ['', [Validators.required]],
      aMinus: ['', [Validators.required]],
      aMinusCount: ['', [Validators.required]],
      bPlus: ['', [Validators.required]],
      bPlusCount: ['', [Validators.required]],
      bMinus: ['', [Validators.required]],
      bMinusCount: ['', [Validators.required]],
      oPlus: ['', [Validators.required]],
      oPlusCount: ['', [Validators.required]],
      oMinus: ['', [Validators.required]],
      oMinusCount: ['', [Validators.required]],
      abPlus: ['', [Validators.required]],
      abPlusCount: ['', [Validators.required]],
      abMinus: ['', [Validators.required]],
      abMinusCount: ['', [Validators.required]]
    });
  }


  notifyVaccine() {
    this.notifyVaccineForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern(this.phoneNumber)]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      selectAvailablity: ['', [Validators.required]]
    });
  }

  setFormValue(value, key, form) {
    this[form].patchValue({
      [key]: value
    })
  }

  setActive(child) {
    if(this.selectedMode == 'Vaccine') {
      return this.selectedChildMode.includes(child) ? true : false;
    } else {
      return this.selectedChildMode == child ? true : false;
    }
  }


  setTab() {
    this.submitted = false;
    this.form.reset();
    this.pinForm.reset();
    this.form.patchValue({
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    })
    this.pinForm.patchValue({
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    })
    this.filterList = [];
    this.selectedHospital = null;
  }

  setPlasma(sub) {
    return sub.some(res => res.available) ? 'Available' : 'Not-Available'
  }

  getStates(): any {
    this.commonService.commonApiCall(
      HOSPITAL.StateUrl,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfStates = res.states;
        }
      }
    );
  }


  getDistrictByState(stateId) {
    this.commonService.commonApiCall(
      HOSPITAL.DistrictUrl + '/' + stateId,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfDistrict = res.districts;
        }
      }
    );
  }


  getComponentdata() {
    this.commonService.commonApiCall(
      COMPONENTS.getComponentdata,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.listOfComponents = res.map(res => {
            res.componentvalues = res.componentvalues.split(",")
            return res;
          });
          this.childList(this.selectedMode);
        }
      }
    );
  }

  fecthdata() {
    this.submitted = true;
    if ((this.form.invalid && (this.selectedMode != 'Plasma' && this.form.get('district').value)) ||
      (this.form.invalid && (this.selectedMode == 'Vaccine' && this.form.get('date').value))) {
      return;
    }
    if (this.selectedMode == 'Vaccine') {
      const params = new HttpParams()
        .set("type", this.selectedMode)
        .set("subtype", this.selectedChildMode)
        .set("district", this.listOfDistrict.find(res => res.district_id == +this.form.get('district').value).district_name)
        .set("date", this.form.get('date').value)
      this.commonCode(VACCINE.getAvailabilityByDistrict + '?' + params);
    } else if (this.selectedMode != 'Plasma') {
      const params = new HttpParams()
        .set("state", this.listOfStates.find(res => res.state_id == +this.form.get('state').value).state_name)
        .set("type", this.selectedMode)
        .set("subtype", this.selectedChildMode)
        .set("district", this.listOfDistrict.find(res => res.district_id == +this.form.get('district').value).district_name)
      this.commonCode(COMPONENTS.fecthdata + '?' + params);
    } else {
      const params = new HttpParams()
        .set("state", this.listOfStates.find(res => res.state_id == +this.form.get('state').value).state_name)
        .set("type", this.selectedMode)
        .set("subtype", this.selectedChildMode)
      this.commonCode(COMPONENTS.fecthdata + '?' + params);
    }
  }

  commonCode(url) {
    this.commonService.commonApiCall(
      url,
      HttpMethod.GET,
      null, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.filterList = res;
        }
      }
    );
  }

  fetchdatabypin() {
    this.submitted = true;
    if (this.pinForm.invalid && (this.selectedMode == 'Vaccine' && this.pinForm.get('date').value)) {
      return;
    }
    if (this.selectedMode == 'Vaccine') {
      const params = new HttpParams()
        .set("type", this.selectedMode)
        .set("subtype", this.selectedChildMode)
        .set("pincode", this.pinForm.get('pinCode').value)
        .set("date", this.pinForm.get('date').value)
      this.commonCode(VACCINE.getAvailabilityByPin + '?' + params);
    } else {
      const params = new HttpParams()
        .set("pincode", this.pinForm.get('pinCode').value)
        .set("type", this.selectedMode)
        .set("subtype", this.selectedChildMode)
      this.commonCode(COMPONENTS.fetchdatabypin + '?' + params);
    }


  }

  openModal(template: TemplateRef<any>, hospital) {
    this.createReportForm();
    if (hospital.resources[0].subtypes.length) {
      for (let h = 0; h < hospital.resources[0].subtypes.length; h++) {
        if (hospital.resources[0].subtypes[h].type === 'Normal') {
          this.reportForm.patchValue({
            regularBed: hospital.resources[0].subtypes[h].available ? true : false
          })
          // } 
          // else if (hospital.resources[0].subtypes[h].type === 'Oxygen') {
          //   this.reportForm.patchValue({
          //     oxygenBed: hospital.resources[0].subtypes[h].available ? true : false
          //   })
        } else if (hospital.resources[0].subtypes[h].type === 'ICU') {
          this.reportForm.patchValue({
            icuBed: hospital.resources[0].subtypes[h].available ? true : false
          })
        } else if (hospital.resources[0].subtypes[h].type === 'Vaccine') {
          this.reportForm.patchValue({
            vaccine: hospital.resources[0].subtypes[h].available ? true : false
          })
        }
      }
    }
    this.selectedHospital = hospital;
    this.submitted = false;
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false, class: 'modal-dialog-width' });
  }

  openPlasmaReport(template: TemplateRef<any>, data) {
    this.newReportPlasma();
    if (data.resources[0].subtypes.length) {
      for (let h = 0; h < data.resources[0].subtypes.length; h++) {
        if (data.resources[0].subtypes[h].type === 'A+Ve') {
          this.newReportPlasmaForm.patchValue({
            aPlus: data.resources[0].subtypes[h].available ? true : false,
            aPlusCount: data.resources[0].subtypes[h].current
          })
        } else if (data.resources[0].subtypes[h].type === 'B+Ve') {
          this.newReportPlasmaForm.patchValue({
            bPlus: data.resources[0].subtypes[h].available ? true : false,
            bPlusCount: data.resources[0].subtypes[h].current
          })
        } else if (data.resources[0].subtypes[h].type === 'A-Ve') {
          this.newReportPlasmaForm.patchValue({
            aMinus: data.resources[0].subtypes[h].available ? true : false,
            aMinusCount: data.resources[0].subtypes[h].current
          })
        } else if (data.resources[0].subtypes[h].type === 'B-Ve') {
          this.newReportPlasmaForm.patchValue({
            bMinus: data.resources[0].subtypes[h].available ? true : false,
            bMinusCount: data.resources[0].subtypes[h].current
          })
        } else if (data.resources[0].subtypes[h].type === 'O-Ve') {
          this.newReportPlasmaForm.patchValue({
            oMinus: data.resources[0].subtypes[h].available ? true : false,
            oMinusCount: data.resources[0].subtypes[h].current
          })
        } else if (data.resources[0].subtypes[h].type === 'O+Ve') {
          this.newReportPlasmaForm.patchValue({
            oPlus: data.resources[0].subtypes[h].available ? true : false,
            oPlusCount: data.resources[0].subtypes[h].current
          })
        } else if (data.resources[0].subtypes[h].type === 'AB-Ve') {
          this.newReportPlasmaForm.patchValue({
            abMinus: data.resources[0].subtypes[h].available ? true : false,
            abMinusCount: data.resources[0].subtypes[h].current
          })
        } else if (data.resources[0].subtypes[h].type === 'AB+Ve') {
          this.newReportPlasmaForm.patchValue({
            abPlus: data.resources[0].subtypes[h].available ? true : false,
            abPlusCount: data.resources[0].subtypes[h].current
          })
        }
      }
    }
    this.submitted = false;
    this.selectedHospital = data;
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false, class: 'modal-dialog-width' });

  }

  openDonorPlasma(template) {
    this.submitted = false;
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false, class: 'modal-dialog-width' });

  }

  openNotifyPlasma(template) {
    this.submitted = false;
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false, class: 'modal-dialog-width' });
  }


  submitReport() {
    this.submitted = true;
    if (this.reportForm.invalid) {
      return;
    }
    this.selectedHospital.comments = null
    //    this.selectedHospital.comments = this.reportForm.get('comment').value;
    this.selectedHospital.name = this.reportForm.get('name').value;
    this.selectedHospital.phonenumber = this.reportForm.get('phonenumber').value;
    for (let h = 0; h < this.selectedHospital.resources[0].subtypes.length; h++) {
      if (this.selectedHospital.resources[0].subtypes[h].type === 'Normal') {
        this.selectedHospital.resources[0].subtypes[h].available = this.reportForm.get('regularBed').value;
        this.selectedHospital.resources[0].subtypes[h].current = this.reportForm.get('regularBedCount').value;
      }
      // else if (this.selectedHospital.resources[0].subtypes[h].type === 'Oxygen') {
      //   this.selectedHospital.resources[0].subtypes[h].available = this.reportForm.get('oxygenBed').value;
      //   this.selectedHospital.resources[0].subtypes[h].current = this.reportForm.get('oxygenBedCount').value;
      // } 
      else if (this.selectedHospital.resources[0].subtypes[h].type === 'ICU') {
        this.selectedHospital.resources[0].subtypes[h].available = this.reportForm.get('icuBed').value;
        this.selectedHospital.resources[0].subtypes[h].current = this.reportForm.get('icuBedCount').value;
      }
      //  else if (this.selectedHospital.resources[0].subtypes[h].type === 'Vaccine') {
      //   this.selectedHospital.resources[0].subtypes[h].available = this.reportForm.get('vaccine').value;
      //   this.selectedHospital.resources[0].subtypes[h].current = this.reportForm.get('vaccineCount').value;
      // }
    }

    this.reportUpdate();
  }

  reportUpdate() {
    this.commonService.commonApiCall(
      `${HOSPITAL.updatereport}/${this.selectedHospital.hospital.hospital_id}`,
      HttpMethod.PUT,
      this.selectedHospital, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          if (this.pinForm.get('pinCode').value) {
            this.fetchdatabypin();
          } else {
            this.fecthdata();
          }
          this.modalRef.hide();
        }
      }
    );
  }

  setBedType(type) {
    switch (type) {
      case 'Normal':
        return 'Regular Bed';
      case 'ICU':
        return 'ICU Bed';
      case 'Oxigen':
        return 'Oxigen Bed';
    }
  }

  childList(child) {
    this.filterList = [];
    this.selectedMode = child;
    this.childLists = [];
    this.childLists = this.listOfComponents.find(res => res.componentname === child).componentvalues;
    if (this.childLists.length) {
      this.selectedChildMode = this.childLists[0];
    }
  }

  selectedChild(data) {
    if (this.selectedMode == 'Vaccine') {
      if (data == 'All') {
        this.selectedChildMode = 'All';
      } else {
        let list = this.selectedChildMode.split(',');
        list = list.filter(res => res != 'All');
        if(list.some(resp => resp == data)) {
          const str = list.filter(res => res != data);
          this.selectedChildMode = str.join();
        } else {
          this.selectedChildMode = list.length ? data + ',' + list.join() : data
        }
      }
    } else {
      this.selectedChildMode = data;
    }
  }

  submitVaccineReport() {

  }

  submitNewPlasma() {
    this.submitted = true;
    if (this.donorPlasmaForm.invalid) {
      return;
    }
    this.commonService.commonApiCall(
      DONOR.adddonor,
      HttpMethod.POST,
      this.donorPlasmaForm.value, (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          this.form.patchValue({
            state: this.donorPlasmaForm.get('state').value
          })
          this.pinForm.patchValue({
            pinCode: this.donorPlasmaForm.get('pincode').value
          })
          this.fecthdata();
          this.donorPlasmaForm.reset();
          this.modalRef.hide();
        }
      }
    );


  }

  notifyMySubmit() {

  }

  submitnewReportPlasma() {
    this.submitted = true;
    if (this.newReportPlasmaForm.invalid) {
      return;
    }

    this.selectedHospital.comments = null
    //    this.selectedHospital.comments = this.reportForm.get('comment').value;
    this.selectedHospital.name = this.newReportPlasmaForm.get('name').value;
    this.selectedHospital.phonenumber = this.newReportPlasmaForm.get('mobileNo').value;
    if (this.selectedHospital.resources[0].subtypes.length) {
      for (let h = 0; h < this.selectedHospital.resources[0].subtypes.length; h++) {
        if (this.selectedHospital.resources[0].subtypes[h].type === 'A+Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('aPlus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('aPlusCount').value;
        } else if (this.selectedHospital.resources[0].subtypes[h].type === 'B+Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('bPlus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('bPlusCount').value;
        } else if (this.selectedHospital.resources[0].subtypes[h].type === 'A-Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('aMinus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('aMinusCount').value;
        } else if (this.selectedHospital.resources[0].subtypes[h].type === 'B-Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('bMinus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('bMinusCount').value;
        } else if (this.selectedHospital.resources[0].subtypes[h].type === 'O-Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('oMinus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('oMinusCount').value;
        } else if (this.selectedHospital.resources[0].subtypes[h].type === 'O+Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('oPlus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('oPlusCount').value;
        } else if (this.selectedHospital.resources[0].subtypes[h].type === 'AB-Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('abMinus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('abMinusCount').value;
        } else if (this.selectedHospital.resources[0].subtypes[h].type === 'AB+Ve') {
          this.selectedHospital.resources[0].subtypes[h].available = this.newReportPlasmaForm.get('abPlus').value;
          this.selectedHospital.resources[0].subtypes[h].current = this.newReportPlasmaForm.get('abPlusCount').value;
        }
      }
    }

    this.reportUpdate();
  }

  notifyMyPlasmaSubmit() {

  }
  notifyMyBedSubmit() {

  }

  updateinfo(obj, flag) {
    const newObj = JSON.parse(JSON.stringify(obj));
    flag == 'up' ? newObj['upvote'] = 1 : newObj['downvote'] = 1;
    this.commonService.commonApiCall(
      HOSPITAL.updateinfo,
      HttpMethod.PUT,
      [newObj], (res, statusFlag) => {
        this.spinner.hide();
        if (statusFlag) {
          if (this.pinForm.get('pinCode').value) {
            this.fetchdatabypin();
          } else {
            this.fecthdata();
          }
          this.donorPlasmaForm.reset();
          this.modalRef.hide();
        }
      }
    );
  }

}

