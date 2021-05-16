import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../core/service/common.service';
import { HttpMethod } from './../../../core/enums/http-handlers';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { COMPONENTS } from '../../../core/enums/urls';

import { HOSPITAL } from '../../../core/enums/urls';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  newReportPlasmaForm: FormGroup;
  notifyVaccineForm: FormGroup;
  selectedHospital: any;

  filterList = [];


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
      district: new FormControl('')
    });
    this.pinForm = new FormGroup({
      pinCode: new FormControl('', Validators.required),
    });

    this.createReportForm();
    this.vaccineRepForm();
    this.newDonorPlasmaForm();
    this.notifyMyPlasmaForm();
    this.newReportPlasma();
    this.notifyVaccine();
    this.getComponentdata();
    this.getStates();
  }

  createReportForm() {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      regularBed: [false, [Validators.required]],
      icuBed: [false, [Validators.required]],
      oxygenBed: [false, [Validators.required]],
      // vaccine: [false, [Validators.required]],
      regularBedCount: ['', [Validators.required]],
      icuBedCount: ['', [Validators.required]],
      oxygenBedCount: ['', [Validators.required]],
      // vaccineCount: ['', [Validators.required]],
      comment: ['']
    });
  }

  vaccineRepForm() {
    this.vaccineReportForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
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
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
      myAge: ['', [Validators.required]],
      dateOfTest: ['', [Validators.required]],
    });
  }

  notifyMyPlasmaForm() {
    this.notifyPlasmaForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
    });
  }

  newReportPlasma() {
    this.newReportPlasmaForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
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
      abMinusCount: ['', [Validators.required]],
    });
  }


  notifyVaccine() {
    this.notifyVaccineForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      selectAvailablity: ['', [Validators.required]],
    });
  }

  setFormValue(value, key, form) {
    this[form].patchValue({
      [key]: value
    })
  }


  setTab() {
    this.submitted = false;
    this.form.reset();
    this.pinForm.reset();
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
    if (this.form.invalid && (this.selectedMode != 'Plasma' && this.form.get('district').value)) {
      return;
    }

    
    if (this.selectedMode != 'Plasma') {
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
    if (this.pinForm.invalid) {
      return;
    }
    const params = new HttpParams()
      .set("pincode", this.pinForm.get('pinCode').value)
      .set("type", this.selectedMode)
      .set("subtype", this.selectedChildMode)
    this.commonCode(COMPONENTS.fetchdatabypin + '?' + params);
  }

  openModal(template: TemplateRef<any>, hospital) {
    this.createReportForm();
    if (hospital.resources[0].subtypes.length) {
      for (let h = 0; h < hospital.resources[0].subtypes.length; h++) {
        if (hospital.resources[0].subtypes[h].type === 'Normal') {
          this.reportForm.patchValue({
            regularBed: hospital.resources[0].subtypes[h].available ? true : false
          })
        } else if (hospital.resources[0].subtypes[h].type === 'Oxygen') {
          this.reportForm.patchValue({
            oxygenBed: hospital.resources[0].subtypes[h].available ? true : false
          })
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
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-width' });
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
      } else if (this.selectedHospital.resources[0].subtypes[h].type === 'Oxygen') {
        this.selectedHospital.resources[0].subtypes[h].available = this.reportForm.get('oxygenBed').value;
        this.selectedHospital.resources[0].subtypes[h].current = this.reportForm.get('oxygenBedCount').value;
      } else if (this.selectedHospital.resources[0].subtypes[h].type === 'ICU') {
        this.selectedHospital.resources[0].subtypes[h].available = this.reportForm.get('icuBed').value;
        this.selectedHospital.resources[0].subtypes[h].current = this.reportForm.get('icuBedCount').value;
      }
      //  else if (this.selectedHospital.resources[0].subtypes[h].type === 'Vaccine') {
      //   this.selectedHospital.resources[0].subtypes[h].available = this.reportForm.get('vaccine').value;
      //   this.selectedHospital.resources[0].subtypes[h].current = this.reportForm.get('vaccineCount').value;
      // }
    }
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
    this.selectedMode = child;
    this.childLists = [];
    this.childLists = this.listOfComponents.find(res => res.componentname === child).componentvalues;
    if (this.childLists.length) {
      this.selectedChildMode = this.childLists[0];
    }
  }

  selectedChild(data) {
    this.selectedChildMode = data;
  }

  submitVaccineReport() {

  }

  submitNewPlasma() {

  }

  notifyMySubmit() {

  }

  submitnewReportPlasma() {

  }

  notifyMyPlasmaSubmit() {

  }

}

