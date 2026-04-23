# Plan: Shared Professional CMS File Manager

## Part 1: Analyze and implement shared file manager

**Start:** 2026-03-23 10:02:36

### Commands and checks

1. Checked existing `Cursor.*.plan.md` files and project history context.
2. Reviewed reference package:
   - `D:\SourceKaravi\GitHub\npm-ntk-cms-angular\projects\ntk-cms-filemanager`
3. Reviewed current project file-manager usage and APIs:
   - `src/app/core/helpers/publicHelper.ts`
   - `src/app/cms-modules/file-manager/**`
   - `src/app/shared/shared.module.ts`
4. Implemented a new shared component:
   - `src/app/shared/cms-file-manager/cms-file-manager.component.ts`
   - `src/app/shared/cms-file-manager/cms-file-manager.component.html`
   - `src/app/shared/cms-file-manager/cms-file-manager.component.scss`
5. Registered component in `SharedModule` declarations/exports.
6. Added i18n keys for all project languages.
7. Ran lint diagnostics for changed files and fixed reported issues.

## Result 1

**Finish:** 2026-03-23 10:02:36
**Status:** Done

### Outcome

- New `app-cms-file-manager` is available in shared layer with:
  - Windows-like professional UI (grid/list modes)
  - Multi-select with selection actions
  - Download selected, copy link, clear selection
  - Keyboard shortcuts (`Ctrl+R`, `Ctrl+L`, `Esc`)
  - Mobile/desktop adaptive height
  - Dark/light compatible styles
- Works on top of current NTK file-manager APIs and existing `TreeModel` flow.

## Part 2: Rebuild from scratch without cms-file-manager

**Start:** 2026-03-23 10:02:36

### Commands and checks

1. Removed dependency from `app-cms-file-manager` to `cms-file-manager`.
2. Rebuilt component logic from base using:
   - `FileCategoryService`
   - `FileContentService`
3. Implemented direct API-driven features:
   - Folder tree and breadcrumb navigation
   - Folder/file listing with grid/list views
   - Search in current folder
   - Multi-select and bulk actions
   - Create folder, rename, delete
   - Upload via shared uploader and save as file content
4. Updated i18n keys for additional labels/actions.
5. Re-ran diagnostics for updated shared component and module wiring.

## Result 2

**Finish:** 2026-03-23 10:02:36
**Status:** Done

### Outcome

- `app-cms-file-manager` is now fully custom and does not use `cms-file-manager` component.
- Architecture is independent and based directly on project APIs and shared uploader.

## Part 3: Complete professional features

**Start:** 2026-03-23 10:02:36

### Commands and checks

1. Added browser-like navigation history:
   - Back/Forward stack
   - Keyboard support (`Alt+Left`, `Alt+Right`)
2. Added sorting system:
   - Sort field (`name`, `type`, `size`, `createdDate`)
   - Sort order toggle (asc/desc)
3. Added right-click context menu:
   - Open, Download, Rename, Copy Link, Delete
4. Added drag/drop move support:
   - Drag file/folder and drop into folder targets
   - Applies API-level move via edit update
5. Updated i18n with additional key set for new actions and sorting labels.
6. Performed lint and JSON validation checks.

## Result 3

**Finish:** 2026-03-23 10:02:36
**Status:** Done

### Outcome

- New custom file manager now includes full pro workflows close to desktop explorers:
  - Navigation history
  - Context actions via right-click
  - Drag/drop relocation
  - Data sorting controls

## Part 4: Replace usage in News Add page

**Start:** 2026-03-27 17:23:22

### Commands and checks

1. Replaced `<cms-file-manager>` usages in:
   - `src/app/cms-modules/news/content/add/add.component.html`
2. Updated event typing and removed obsolete imports in:
   - `src/app/cms-modules/news/content/add/add.component.ts`
3. Verified no remaining `ntk-cms-filemanager` dependency in this component.
4. Ran lint diagnostics on changed files.

## Result 4

**Finish:** 2026-03-27 17:23:22
**Status:** Done

### Outcome

- News content add page now uses `app-cms-file-manager` for main image/podcast/movie selection & upload flow.

## Part 5: Add Popup mode to app-cms-file-manager

**Start:** 2026-03-27 17:23:22

### Commands and checks

1. Reviewed popup patterns in:
   - `src/app/shared/cms-link-management/cms-link-management.component.ts`
   - `src/app/shared/cms-link-management-to/cms-link-management-to.component.ts`
2. Added popup-capable inputs to `app-cms-file-manager`:
   - `isPopup`, `openForm`/`openFormChange` (two-way), open button options
3. Implemented modal overlay + backdrop close behavior.
4. Added i18n keys for popup open/close labels.
5. Ran lint diagnostics after template restructure.

## Result 5

**Finish:** 2026-03-27 17:23:22
**Status:** Done

### Outcome

- `app-cms-file-manager` now supports true Popup UX while keeping inline mode.
