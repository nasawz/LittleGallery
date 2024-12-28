#!/bin/bash

# 获取当前时间戳
timestamp=$(date +"%Y%m%d_%H%M%S")
package_name="LittleGallery_$timestamp"

# 创建临时目录
mkdir -p "$package_name"

# 使用rsync复制文件，排除不需要的文件和目录
rsync -av --progress ./ "./$package_name" \
    --exclude='.git' \
    --exclude='.gitignore' \
    --exclude='__pycache__' \
    --exclude='*.pyc' \
    --exclude='.DS_Store' \
    --exclude='venv' \
    --exclude='.idea' \
    --exclude='.vscode' \
    --exclude="$package_name"

# 创建zip文件
zip -r "${package_name}.zip" "$package_name"

# 删除临时目录
rm -rf "$package_name"

echo "打包完成: ${package_name}.zip" 