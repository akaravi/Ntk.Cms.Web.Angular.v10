import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  AccessModel, ApplicationSourceModel, CoreEnumService,
  DataFieldInfoModel, ErrorExceptionResult,
  FormInfoModel,
  TicketingDepartemenOperatorModel,
  TicketingDepartemenOperatorService
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { AddBaseComponent } from 'src/app/core/cmsComponent/addBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { PoinModel } from 'src/app/core/models/pointModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
    selector: 'app-aplication-intro-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: false
})
export class TicketingDepartemenOperatorAddComponent extends AddBaseComponent<TicketingDepartemenOperatorService, TicketingDepartemenOperatorModel, number> implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    private ticketingDepartemenOperatorService: TicketingDepartemenOperatorService,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(ticketingDepartemenOperatorService, new TicketingDepartemenOperatorModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  requestDepartemenId = 0;

  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  dataModel = new TicketingDepartemenOperatorModel();
  dataModelResult: ErrorExceptionResult<TicketingDepartemenOperatorModel> = new ErrorExceptionResult<TicketingDepartemenOperatorModel>();


  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerOpenForm = false;
  appLanguage = 'fa';

  fileManagerTree: TreeModel;
  mapMarker: any;
  mapOptonCenter = new PoinModel();

  ngOnInit(): void {
    this.requestDepartemenId = + Number(this.activatedRoute.snapshot.paramMap.get('SourceId'));
    if (this.requestDepartemenId === 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }
    this.dataModel.linkDepartemenId = this.requestDepartemenId;
    this.DataGetAccess();

  }


  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }
    if (this.dataModel.linkDepartemenId <= 0) {
      this.translate.get('MESSAGE.Specify_the_department').subscribe((str: string) => {
        this.cmsToastrService.typeErrorEdit(str);
      });

      return;
    }

    this.DataAddContent();
  }


  DataAddContent(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });


    this.ticketingDepartemenOperatorService
      .ServiceAdd(this.dataModel)
      .subscribe({
        next: (ret) => {

          this.formInfo.formSubmitAllow = !ret.isSuccess;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.cmsToastrService.typeSuccessEdit();
            setTimeout(() => this.router.navigate(['/application/app/']), 1000);
          } else {
            this.cmsToastrService.typeErrorEdit(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);

        },
        error: (err) => {
          this.publicHelper.processService.processStop(pName);

          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorEdit(err);
        }
      }
      );
  }

  onStepClick(event: StepperSelectionEvent, stepper: any): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {
      // if (!this.formGroup.valid) {
      //   this.cmsToastrService.typeErrorFormInvalid();
      //   setTimeout(() => {
      //     stepper.selectedIndex = event.previouslySelectedIndex;
      //     // stepper.previous();
      //   }, 10);
      // }
    }
  }

  onActionBackToParent(): void {
    this.router.navigate(['/ticketing/departeman/']);
  }
  onActionFileSelectedLinkMainImageId(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }

  onActionSelectSource(model: ApplicationSourceModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get(['MESSAGE.Specify_the_source', 'MESSAGE.The_source_of_the_information_application_is_not_known']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(
          str['MESSAGE.Specify_the_source'],
          str['MESSAGE.The_source_of_the_information_application_is_not_known']
        );
      });
      return;
    }
    this.dataModel.linkDepartemenId = model.id;
  }

}
