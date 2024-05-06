
param(
	[string]$componentName = $( Read-Host "Enter Component Name" )
)

write-output $componentName

md ./src/components/$componentName
touch ./src/components/$componentName/index.tsx
touch ./src/components/$componentName/$componentName.module.css


