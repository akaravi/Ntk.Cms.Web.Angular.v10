import { AccessModel, FilterDataModel, FilterModel } from "ntk-cms-api";
import { ComponentOptionModel } from "./componentOptionModel";

export class ComponentOptionSearchModel
  implements
    ComponentOptionModel<
      ComponentOptionSearchDataModel,
      ComponentOptionSearchChildMethodsModel,
      ComponentOptionSearchParentMethodsModel
    >
{
  childMethods: ComponentOptionSearchChildMethodsModel;
  parentMethods: ComponentOptionSearchParentMethodsModel;
  data: ComponentOptionSearchDataModel = new ComponentOptionSearchDataModel();
  constructor() {
    this.data = new ComponentOptionSearchDataModel();
  }
}

export class ComponentOptionSearchChildMethodsModel {
  setAccess: (x: AccessModel) => void;
}
export class ComponentOptionSearchParentMethodsModel {
  onSubmit: (x: Array<FilterDataModel>) => void;
}
export class ComponentOptionSearchDataModel {
  show = false;
  select: any;
  defaultQuery: string;
  access: AccessModel;
  filterModelContent: FilterModel = new FilterModel();
  /**show fast search  */
  filterActionSearchLinkEntityIdShow = false;
  filterActionSearchLinkUserIdShow = false;
  filterActionSearchLinkSiteIdShow = false;
  filterActionSearchLinkModuleIdShow = false;
  filterActionSearchRecordStatusShow = false;
  filterActionSearchCreatedDateShow = false;
  filterActionSearchUpdatedDateShow = false;
}
