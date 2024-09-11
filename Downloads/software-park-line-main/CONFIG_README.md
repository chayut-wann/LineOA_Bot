# Project Title

LINE ChatBot with Reserve bot System

# download

- node js
- vs code
- git

# Extensions

- npm Intelliisense
- JavaScript (ES6) code snippets

# Step push to Git

- open new terminal
- git add .
- git commit -m "(ใส่ข้อความเตือนตัวเองว่า แก้ไขอะไรในงาน)"
- git branch -M main
- git remote add origin https://hithub.com/(ชื่อใน git)/(repository ที่สร้างใหม่ใน git เช่น xxx.git) ---- ! ถ้าเคย remote แล้วไม่ต้องทำซ้ำอีก !
- git push -u origin main

# Step push to Git with heroku

- heroku login
- heroku git:remote -a (ชื่อ app บน heroku) ---- ! ถ้าเคย remote แล้วไม่ต้องทำซ้ำอีก !
- git add .
- git commit -am "make it better"
- git push heroku main

# Check remote git

- git remote -v

# Remove remote git

- git remote remove origin ---- (สำหรับ github)
- git remote remove heroku ---- (สำหรับ heroku)
