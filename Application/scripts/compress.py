from PIL import Image
import os

def compress_images(source_folder, max_size=1920):
    # 确保源文件夹存在
    if not os.path.exists(source_folder):
        print(f"文件夹 {source_folder} 不存在！")
        return
    
    # 创建输出文件夹（如果不存在）
    output_folder = os.path.join(source_folder, "compressed")
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # 支持的图片格式
    supported_formats = ['.png', '.PNG', '.jpeg', '.JPEG', '.jpg', '.JPG']
    
    # 遍历文件夹中的所有文件
    for filename in os.listdir(source_folder):
        file_path = os.path.join(source_folder, filename)
        
        # 检查是否为文件且是支持的图片格式
        if os.path.isfile(file_path) and any(filename.endswith(fmt) for fmt in supported_formats):
            try:
                # 打开图片
                with Image.open(file_path) as img:
                    # 转换为RGB模式（处理PNG等格式）
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    
                    # 计算新的尺寸
                    width, height = img.size
                    if width > max_size or height > max_size:
                        if width > height:
                            new_width = max_size
                            new_height = int(height * max_size / width)
                        else:
                            new_height = max_size
                            new_width = int(width * max_size / height)
                        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    
                    # 生成新文件名（使用jpg扩展名）
                    new_filename = os.path.splitext(filename)[0] + "_compressed.jpg"
                    output_path = os.path.join(output_folder, new_filename)
                    
                    # 保存压缩后的图片
                    img.save(output_path, 'JPEG', quality=85)
                    print(f"已处理: {filename} -> {new_filename}")
                    
            except Exception as e:
                print(f"处理 {filename} 时出错: {str(e)}")

if __name__ == "__main__":
    # 获取当前脚本所在目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # 获取项目根目录（假设脚本在 Application/scripts 文件夹下）
    root_dir = os.path.dirname(os.path.dirname(current_dir))
    # 构建 @screenshots 文件夹的完整路径
    screenshots_folder = os.path.join(root_dir, "Application/screenshots")
    compress_images(screenshots_folder)
    print("处理完成！")