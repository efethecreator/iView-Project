Proje; Node.js/TypeScript tabanlı bir backend servisi, React ile yazılmış iki ayrı frontend (yönetici paneli ve aday tarafı) barındırır.

Backend
src/app.ts dosyasında Express sunucusu tanımlanır ve admin, kullanıcı, mülakat ve video rotaları burada devreye alınır.

Mülakatların yapısı ve soru paketleri gibi veriler MongoDB modelleri ile tanımlıdır (ör. interviewModel.ts, question-package.model.ts).

Videoların AWS S3 üzerinde depolanması için videoServices.ts adlı servis bulunur.

/api/interview ve /api/videos gibi REST servisleri, mülakat oluşturma/silme, video yükleme/silme gibi işlemleri gerçekleştirir.

Frontend (Admin Panel)
frontend/ klasörü yöneticiler için React uygulamasını içerir. Admin panelinde oturum açma, soru paketlerini yönetme, mülakat ve videoları görüntüleme gibi özellikler mevcut.

Adayların gönderdikleri videolar VideoCollectionPage.jsx bileşeninde liste ve modallerle izlenebilir, statü (Pass/Fail/Pending) güncellenebilir.

User Frontend (Aday Tarafı)
user-frontend/ klasöründeki React uygulaması adayların video mülakat kaydı yapmasına odaklanır.

VideoRecorderPage.jsx adaydan kişisel bilgileri toplayıp video kaydını başlatır ve soruları sırayla gösterir.

Kısacası proje, yöneticilerin soru paketleri hazırlayıp mülakat süreçlerini yürüttüğü ve adayların videolu yanıtlarını kaydedip yükleyebildiği, kayıtların S3’te saklandığı bir çevrim içi mülakat sistemidir.
