import { Component, OnInit } from '@angular/core';
import { TokenInfoModelV3 } from 'ntk-cms-api';
import { TreeModel } from 'ntk-cms-filemanager';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-file-content-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  standalone: false
})
export class FileContentExplorerComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor(public publicHelper: PublicHelper, private tokenHelper: TokenHelper,private cmsStoreService:CmsStoreService,) {
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.language = this.tokenInfo.access.language;
    }
  }
  tokenInfo = new TokenInfoModelV3();
  language = 'en';
  fileManagerOpenForm = true;
  fileManagerTree: TreeModel;
  selectFileType = [];
  ngOnInit(): void {
  }
}
