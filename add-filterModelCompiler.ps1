# Script to add filterModelCompiler method to all list components
# This script finds all list.component.ts files that have filterDataModelQueryBuilder but don't have filterModelCompiler

$basePath = "src\app\cms-modules"
$files = Get-ChildItem -Path $basePath -Recurse -Filter "list.component.ts" | Where-Object {
    $content = Get-Content $_.FullName -Raw
    $hasFilterDataModelQueryBuilder = $content -match "filterDataModelQueryBuilder"
    $hasFilterModelCompiler = $content -match "filterModelCompiler"
    return $hasFilterDataModelQueryBuilder -and -not $hasFilterModelCompiler
}

Write-Host "Found $($files.Count) files that need filterModelCompiler" -ForegroundColor Green

$count = 0
foreach ($file in $files) {
    $count++
    Write-Host "[$count/$($files.Count)] Processing: $($file.FullName)" -ForegroundColor Yellow

    $content = Get-Content $file.FullName -Raw

    # Check if file already has filterModelCompiler
    if ($content -match "filterModelCompiler") {
        Write-Host "  Already has filterModelCompiler, skipping..." -ForegroundColor Gray
        continue
    }

    # Pattern 1: Add filterModelCompiler method before DataGetAll
    $pattern1 = "(?s)(\s+ngOnDestroy\(\)[^}]*\}\s+)(DataGetAll\(\)[^:]*:)"
    $replacement1 = "`$1filterModelCompiler(model: FilterModel): FilterModel {`r`n    /*filter CLone*/`r`n    const filterModel = JSON.parse(JSON.stringify(model));`r`n    /*filter CLone*/`r`n    /*filter add search*/`r`n    if (`r`n      this.filterDataModelQueryBuilder &&`r`n      this.filterDataModelQueryBuilder.length > 0`r`n    ) {`r`n      filterModel.filters = [...this.filterDataModelQueryBuilder];`r`n    }`r`n    /*filter add search*/`r`n    return filterModel;`r`n  }`r`n  `$2"

    if ($content -match $pattern1) {
        $content = $content -replace $pattern1, $replacement1
        Write-Host "  Added filterModelCompiler method" -ForegroundColor Green
    }

    # Pattern 2: Replace JSON.parse(JSON.stringify) with filterModelCompiler in DataGetAll
    $pattern2 = "(?s)(this\.filteModelContent\.accessLoad\s*=\s*true;)\s*(/\*filter CLone\*/\s*const filterModel\s*=\s*JSON\.parse\(JSON\.stringify\(this\.filteModelContent\)\);\s*/\*filter CLone\*/\s*/\*filter add search\*/\s*if\s*\(\s*this\.filterDataModelQueryBuilder\s*&&\s*this\.filterDataModelQueryBuilder\.length\s*>\s*0\s*\)\s*\{\s*filterModel\.filters\s*=\s*\[\.\.\.this\.filterDataModelQueryBuilder\];\s*\}\s*/\*filter add search\*/)"
    $replacement2 = "`$1`r`n    const filterModel = this.filterModelCompiler(this.filteModelContent);"

    if ($content -match $pattern2) {
        $content = $content -replace $pattern2, $replacement2
        Write-Host "  Updated DataGetAll to use filterModelCompiler" -ForegroundColor Green
    }

    # Pattern 3: Replace JSON.parse(JSON.stringify) with filterModelCompiler in onActionButtonStatist
    $pattern3 = "(?s)(const filterModel\s*=\s*)JSON\.parse\(JSON\.stringify\(this\.filteModelContent\)\);(?=\s*/\*\*filterActionSearch\*\/)"
    $replacement3 = "`$1this.filterModelCompiler(this.filteModelContent);"

    if ($content -match $pattern3) {
        $content = $content -replace $pattern3, $replacement3
        Write-Host "  Updated onActionButtonStatist to use filterModelCompiler" -ForegroundColor Green
    }

    # Pattern 4: Replace JSON.parse(JSON.stringify) with filterModelCompiler in filterStatist1
    $pattern4 = "(?s)(const filterStatist1\s*=\s*)JSON\.parse\(JSON\.stringify\(this\.filteModelContent\)\);"
    $replacement4 = "`$1this.filterModelCompiler(this.filteModelContent);"

    if ($content -match $pattern4) {
        $content = $content -replace $pattern4, $replacement4
        Write-Host "  Updated filterStatist1 to use filterModelCompiler" -ForegroundColor Green
    }

    # Save the file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "  File updated successfully" -ForegroundColor Green
}

Write-Host "`nCompleted! Processed $count files." -ForegroundColor Green
