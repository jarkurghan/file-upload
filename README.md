# FILE-UPLOAD
## Ilova haqida
- Fayllarni yuklash va yuklab olish uchun API
- Ilovani tayyorlash uchun express, multer, knex, postgres'dan foydalanilgan.
- fayllar `/files` papkasida, fayl ma'lumotlari database'da saqlanadi
- APIs:  
  1.Upload file - `POST`
  2.Download file - `GET`
## Ishga tushurish
* `<your_database_credentials>` - database bilan connection qilish uchun database parametrlari
* paketlarni o'rnating:
    ````
    $ npm install
    ````
* migrate, query yoki o'zingizga qulay bo'lgan usulda database'da `files` table'ni yarating: u `id`, `name`, `type` ustunlarini o'z ichiga olsin
* ekspress serverni ishga tushiring

    ```
    $ npm start
    ```

## Qo'shimcha
- API xavfsizlik jihatdan ochiq
- [Dasturchi bilan bog'lanish](https://t.me/nazirov_web_log)