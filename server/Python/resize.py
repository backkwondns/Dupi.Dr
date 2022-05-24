import cv2
from PIL import Image
import sys

img_loc = sys.argv[1]
img_root = "../public" + img_loc


TARGET_IMAGE_SIZE = (380, 380)

img = cv2.imread(img_root, cv2.IMREAD_COLOR)
resized_img = cv2.resize(img, dsize=TARGET_IMAGE_SIZE, interpolation=cv2.INTER_AREA)

save_image_path = img_root[:-4] + '_resize' + img_root[-4:]
cv2.imwrite(save_image_path, resized_img)
