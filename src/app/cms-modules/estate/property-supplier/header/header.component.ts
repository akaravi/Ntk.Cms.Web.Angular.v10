
import {
  ChangeDetectorRef, Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  DataFieldInfoModel, ErrorExceptionResult,
  EstatePropertySupplierModel,
  EstatePropertySupplierService
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';



@Component({
  selector: 'app-estate-property-supplier-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class EstatePropertySupplierHeaderComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private headerService: EstatePropertySupplierService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cmsToastrService: CmsToastrService,
    public dialog: MatDialog,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

  }
  @Input() optionId = '';

  dataModelResult: ErrorExceptionResult<EstatePropertySupplierModel> = new ErrorExceptionResult<EstatePropertySupplierModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();



  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    if (this.optionId.length > 0) {
      this.DataGetOneContent();
      this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
        this.DataGetOneContent();
      });
    }


  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }

  DataGetOneContent(): void {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.headerService.setAccessLoad();
    this.headerService.ServiceGetOneById(this.optionId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
}
