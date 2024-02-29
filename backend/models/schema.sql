-- Create a table called **roles** in the database
DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE
  roles (
    id SERIAL PRIMARY KEY NOT NULL,
    role VARCHAR(255) UNIQUE NOT NULL
  );

-- insert roles
INSERT INTO
  roles (role)
VALUES
  ('Admin'),
  ('User') RETURNING *;

-- Create a table called **permissions** in the database
DROP TABLE IF EXISTS permissions CASCADE;

CREATE TABLE
  permissions (
    id SERIAL PRIMARY KEY NOT NULL,
    permission VARCHAR(255) NOT NULL
  );

-- insert permissions  
INSERT INTO
  permissions (permission)
VALUES
  ('MANAGE_ROLES'),
  ('MANAGE_USERS'),
  ('MANAGE_POSTS'),
  ('MANAGE_COMMENTS'),
  ('MANAGE_SHARES'),
  ('MANAGE_PAGES') RETURNING *;

-- Create a table called **role_permission** in the database
DROP TABLE IF EXISTS role_permission CASCADE;

CREATE TABLE
  role_permission (
    id SERIAL PRIMARY KEY NOT NULL,
    role_id INT REFERENCES roles (id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions (id) ON DELETE CASCADE
  );

-- insert role_permission connections
INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6) RETURNING *;

-- Create a table called **users** in the database
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
  users (
    id SERIAL PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image TEXT DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200',
    role_id INT NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert users
INSERT INTO
  users (email, user_name, password, image, role_id)
VALUES
  (
    'admin@gmail.com',
    'admin',
    123456,
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708828432/r3e0rfwqxjvjewdvniog.jpg',
    1
  ),
  (
    'hunter@gmail.com',
    'Hunter',
    123456,
    -- 'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708828492/dyvktcghcwa3xyiltpox.jpg',
    'https://qph.cf2.quoracdn.net/main-qimg-a5d484a15c9414bca078805e4ccf5567-lq',
    2
  ),
  (
    'veteran@gmail.com',
    'Veteran',
    123456,
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708828557/kvmzgyam3h4pqagnym9t.jpg',
    2
  ),
  (
    'japania@gmail.com',
    'Japania',
    123456,
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708828616/ztihgiwdiw8rrcv2dkd0.jpg',
    -- 'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708829339/nmshvh2fxpcakdux79d5.jpg', robin
    2
  ),
  (
    'space@gmail.com',
    'she space',
    123456,
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708828696/xht6bpw8yfjvfme60bkq.jpg',
    2
  ),
  (
    'meraki@gmail.com',
    'Meraki',
    123456,
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708829657/xmazfa0odnmjlqtcjg4u.jpg',
    2
  ),
  (
    'Udemy@gmail.com',
    'Udemy',
    123456,
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708829713/zsvgmff3exn853z0dcxt.jpg',
    2
  ) RETURNING *;

--! the inserted passwords are not encrypted so the login will not work on them, so we need to register from POSTMAN.
--
-- Create a table called **user_profile** in the database
DROP TABLE IF EXISTS user_profile CASCADE;

CREATE TABLE
  user_profile (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    first_name VARCHAR(255) DEFAULT 'John',
    last_name VARCHAR(255) DEFAULT 'Doe',
    birthday TIMESTAMP,
    gender VARCHAR(6) CHECK (gender IN ('male', 'female')),
    phone_number INT UNIQUE,
    school VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    cover_photo TEXT DEFAULT 'https://colorfully.eu/wp-content/uploads/2013/07/beautiful-sea-view-facebook-cover.jpg',
    bio VARCHAR(255) DEFAULT 'add bio'
  );

-- insert users
INSERT INTO
  user_profile (
    user_id,
    first_name,
    last_name,
    birthday,
    gender,
    phone_number,
    school,
    city,
    state,
    country
  )
VALUES
  (
    1,
    'Adam',
    'Lahloh',
    '2020-05-18',
    'male',
    0790000001,
    'KG',
    'Amman',
    'Amman',
    'Jordan'
  ),
  (
    2,
    'Gon',
    'Freecss',
    '2000-11-11',
    'male',
    0790000002,
    'Heavens Arena',
    'Irbid',
    'Irbid',
    'Jordan'
  ),
  (
    3,
    'Old',
    'Man',
    '1900-09-09',
    'male',
    0790000003,
    'None',
    'Zarqa',
    'Zarqa',
    'Jordan'
  ),
  (
    4,
    'Geisha',
    'Girl',
    '2008-08-08',
    'female',
    0790000004,
    'High school',
    'East',
    'Blue',
    'New World'
  ),
  (
    5,
    'Astro',
    'Girl',
    '1999-09-09',
    'female',
    0790000005,
    'Space',
    'Moon',
    'Pluto',
    'Star Wars'
  ),
  (
    6,
    'Meraki',
    'Academy',
    '2020-02-02',
    'male',
    0790000007,
    'Academy',
    'Full',
    'Stack',
    'Developer'
  ),
  (
    7,
    'Udemy',
    'Platform',
    '2011-11-11',
    'female',
    0790000008,
    'Learn',
    'Test',
    'Quiz',
    'Exam'
  ) RETURNING *;

-- Create a table called **pages** in the database
DROP TABLE IF EXISTS pages CASCADE;

CREATE TABLE
  pages (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    page_name VARCHAR(255) NOT NULL UNIQUE,
    image TEXT DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y&s=200',
    cover_photo TEXT DEFAULT 'https://colorfully.eu/wp-content/uploads/2013/07/beautiful-sea-view-facebook-cover.jpg',
    bio TEXT DEFAULT 'add bio',
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert pages
INSERT INTO
  pages (user_id, page_name, image, cover_photo, bio)
VALUES
  (
    6,
    'Meraki Academy JO أكاديمية ميراكي ',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708829657/xmazfa0odnmjlqtcjg4u.jpg',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708829583/i1vimgiptqf5hhclsco1.jpg',
    'معسكر تعلم البرمجة من الصفر
بغض النظر عن تخصصك او خلفيتك البرمجية
ومساعدتك على ايجاد وظيفة كـ مبرمج'
  ),
  (
    7,
    'Udemy',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708829713/zsvgmff3exn853z0dcxt.jpg',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708829728/uvonvzdfuzextvvqaxko.png',
    'Learn and teach (almost) anything online.

Have a question? Visit: bit.ly/udemy-support'
  ) RETURNING *;

-- Create a table called **page_content** in the database
DROP TABLE IF EXISTS page_content CASCADE;

CREATE TABLE
  page_content (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    page_id INT NOT NULL REFERENCES pages (id) ON DELETE CASCADE,
    page_content TEXT
  );

--! need to discuss the page_content data type and what values it will hold.
-- insert page_content
INSERT INTO
  page_content (user_id, page_id, page_content)
VALUES
  (
    1,
    1,
    'Lorem ipsum  elit. Pariatur harum excepturi esse quas consectetur sed nobis, cumque culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum '
  ),
  (
    1,
    2,
    'Lorem ipsum , cumque culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum'
  ),
  (
    2,
    1,
    'it amet consectetur adipisicing elit. Pariatur harum excepturi esse quas consectetur sed nobis, cumque culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum'
  ),
  (
    2,
    2,
    'r, sit amet consectetur adipisicing elit. Pariatur harum excepturi esse quas consectetur sed nobis, cumque culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum'
  ),
  (
    3,
    1,
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur harum excepturi essectetur sed nobis, cumque culpa repellendus quo, atque iusto maximegnam aperiam quia neque ipsa laborum'
  ),
  (
    3,
    2,
    'Loreor, sit amet consectetur adipisicing elit. Pariatur harum excepturi essectetur sed nobis, cumque culpa repellendus quo, atque iusto maximegnam aperiam quia neque ipsa laborum'
  ),
  (
    4,
    1,
    'Loreor, sit amet consectetur adipisicing elit. Pariatur harum excepturi essectetur sed nobis, cumque culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum'
  ),
  (
    4,
    2,
    ' consectetur adipisicing elit. Pariatur harum exceptur nobis, cumque culpa repellendus quo, atque iusto ma quia neque ipsa laborum'
  ),
  (
    5,
    1,
    ' consectetur adipisicing elit. Pariatur harum exceptur nobis, cumque culpa repellendus quo, atque iusto ma quia neque ipsa laborum'
  ),
  (
    5,
    2,
    ' consectetur adipisicing elit. Pariatur harum excepturi esse quas consectetur sed nobis, cumque culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum'
  ),
  (
    1,
    1,
    ' elit. Pariatur harum excepturellendus quo, atque iusto ma'
  ),
  (
    1,
    2,
    ' elit. Pariatur harum excepturi esse quas consectetur sed nobis, cumque culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum'
  ),
  (
    2,
    1,
    ' adipisicing elit. Pariatur harum excepturue culpa repellendus quo, atque iusto maipsa laborum'
  ),
  (
    2,
    2,
    ' adipisicing elit. Pariatur harum excepturue culpa repellendus quo, atque iusto maipsa laborum'
  ),
  (
    3,
    1,
    ' adipisicing elit. Pariatur harum excepturue culpa repellendus quo, atque iusto maipsa laborum'
  ),
  (
    3,
    2,
    ' adipisicing elit. Pariatur harum excepturue culpa repellendus quo, atque iusto maxime maiores magnam aperiam quia neque ipsa laborum'
  ),
  (
    4,
    1,
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur harum excepturi esse quas consectetur sed nobis, cumque culpa repellendus quo, atque iusto maxime maque ipsa laborum'
  ),
  (
    4,
    2,
    'Lorem ietur adipisicing elit. Pariatur harum excepturi esse cumque culpa repellendus quo, atque iusto maxime maque ipsa laborum'
  ),
  (
    5,
    1,
    'Lorem ietur adipisicing elit. Pariatur harum excepturi esse cumque culpa repellendus quo, atque iusto maxime maque ipsa laborum'
  ),
  (
    5,
    2,
    'Lorem ietur adipisicing elit. Pariatur harum excepturi esse cumque culpa repellendus quo, atque iusto maxime maque ipsa laborum'
  ) RETURNING *;

-- Create a table called **page_likes** in the database
DROP TABLE IF EXISTS page_likes CASCADE;

CREATE TABLE
  page_likes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    page_id INT NOT NULL REFERENCES pages (id) ON DELETE CASCADE
  );

-- insert page_likes
INSERT INTO
  page_likes (user_id, page_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2),
  (3, 1),
  (3, 2),
  (4, 1),
  (4, 2),
  (5, 1),
  (5, 2),
  (6, 1),
  (7, 2) RETURNING *;

-- Create a table called **friends** in the database
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE
  friends (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    --! /* UNION */ ///////////////
    friend_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

--! we have  user_id  and friend_id both refers to users table for unique instances (persons).
-- insert friends
INSERT INTO
  friends (user_id, friend_id)
VALUES
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 3),
  (2, 4),
  (2, 5),
  (3, 4),
  (3, 5),
  (4, 5) RETURNING *;

-- Create a table called **posts** in the database
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE
  posts (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    page_id INT REFERENCES pages (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    photo_url TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert posts
INSERT INTO
  posts (user_id, page_id, content, photo_url)
VALUES
  (
    6,
    1,
    'أهم النصائح لإنشاء سيرة ذاتية احترافية
1- أضف معلومات التواصل بشكل دقيق وتأكد من عدم وجود أخطاء فيها
2- أكتب وصف مميز أو تلخيص لسيرتك الذاتية بطريقتك الخاصة
3- أنشئ قائمة لمهاراتك المتعلقة بمجال العمل و قائمة للمهارات الغير مرتبطة بالعمل
4- أضف قسم مخصص للشهادات الأكاديمية و الدورات التدريبية والخبرات ان وجد
(الترتيب دائما من الأحدث إلى الأقدم)
5- لا تنسى تعديل السيرة الذاتية لتلائم كل وظيفة جديدة تتقدم لها',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708863944/xtoxvrmvkgyds9ajlqgc.jpg'
  ),
  (
    6,
    1,
    'لاتنتظر الفرصة، بل اخلقها بنفسك.
________________________________________
لو مهتم بتطوير مهاراتك لدخول مجال البرمجة
سجل معنا الآن في معسكر أكاديمية ميراكي لـ تعلم البرمجة:
rebrand.ly/MerakiAcademyJO_RFS1
أو تواصل معنا عن طريق الواتس آب على الرابط التالي:
wa.me/962787875915
#MerakiAcademyJO #MerakiAcademy',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864010/qvmg6rl00dh9pabngtqn.jpg'
  ),
  (
    6,
    1,
    'خمس أسباب تدعوك لإنشاء حساب على LinkedIn
1- يساعد على بناء شبكة معارف من المحترفين و الخبراء بمجالات متعددة
2- مكان مثالي لتوثيق خبراتك / مهاراتك / وانجازاتك
3- يساعدك على استكشاف فرص عمل جديدة بشكل مستمر
4- يستخدم كـ مصدر أساسي للبحث عن كافة تفاصيل الشركات و مجالات العمل
5- يساعدك على الظهور أمام المسؤولين عن التوظيف في الشركات العالمية
________________________________________
لو مهتم بتطوير مهاراتك لدخول مجال البرمجة
سجل معنا الآن في معسكر أكاديمية ميراكي لـ تعلم البرمجة:
https://lnkd.in/eJwvzpjG
أو تواصل معنا عن طريق الواتس آب على الرابط التالي:
wa.me/962787875915
#MerakiAcademyJO #MerakiAcademy',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864212/vbumbiecyent00hvwnf8.jpg'
  ),
  (
    6,
    1,
    'من هو مطور الFull-Stack

هو المطور (المبرمج) المسؤول عن بناء المواقع الالكترونية بشكل كامل من واجهة المستخدم (FrontEnd) الى جانب السيرفر (BackEnd)

بالإضافة الى بناء مميزات جديدة و ربط المواقع بـ مجموعة من القواعد و البروتوكولات التي تسمح لتطبيقات البرامج بالعمل معا و مشاركة البيانات

للمزيد من المعلومات يرجى التواصل معنا

________________________________________

لو مهتم بتطوير مهاراتك لدخول مجال البرمجة

سجل معنا الآن في معسكر أكاديمية ميراكي لـ تعلم البرمجة:

rebrand.ly/MerakiAcademyJO_RFS1

أو تواصل معنا عن طريق الواتس آب على الرابط التالي:

wa.me/962787875915

#MerakiAcademyJO #MerakiAcademy',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864252/j5pupnunndvfxtkdfsrm.jpg'
  ),
  (
    6,
    1,
    '
لو مهتم بتطوير مهاراتك لدخول مجال البرمجة

سجل معنا الآن في معسكر أكاديمية ميراكي لـ تعلم البرمجة:

rebrand.ly/MerakiAcademyJO_RFS1

أو تواصل معنا عن طريق الواتس آب على الرابط التالي:

wa.me/962787875915

#MerakiAcademyJO #MerakiAcademy',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864286/zsodyhniwtu4alwiwrnm.jpg'
  ),
  (
    6,
    1,
    'ما المقصود بـ JavaScript؟

تُقدم اكاديمية ميراكي مسارًا كاملًا يأخذ بيدك من الصفر وحتى الاحتراف لتتعلم الجافا سكريبت بطريقة احترافية عن طريق التطبيق العملي على مشاريع حقيقية،

JavaScript هي لغة برمجة يستخدمها المطورون في بناء صفحات ويب تفاعلية. بدايةً من تحديث مواجز الوسائط الاجتماعية وحتى عرض الرسوم المتحركة والخرائط التفاعلية، يمكن لوظائف JavaScript أن تحسّن تجربة مستخدم وقع الويب. ونظرًا لأنها لغة برمجة نصية من طرف
العميل، فإنها تعد واحدة من التقنيات الأساسية في شبكة الويب العالمية. على سبيل المثال، عندما ترى أثناء تصفح الإنترنت عرضًا دوّارًا للصور، أو قائمةً منسدلةً بطريقة انقر للعرض، أو تغيرًا ديناميكيًا في ألوان العناصر على صفحة ويب ، فكل هذا من تأثيرات JavaScript.',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864335/yqcgmydh0qtu5logpkiq.jpg'
  ),
  (
    7,
    2,
    'Join us for a special event with WISE! 🌟

Through a day in the life with us, you willll learn about Udemy:

▪️ Commitment to Belonging, Equity, Diversity, and Inclusion (BEDI)
▪️ Online learning insights
▪️ Hiring focus

RSVP for the replay if you can not make it live ➡️ bit.ly/48pNJLs
',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708866862/qq2z0zadacdh7shoiy4l.jpg'
  ),
  (
    7,
    2,
    'UDEMY',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708866954/bazghj137vatxk4vflfa.jpg'
  ),
  (
    7,
    2,
    'Chat GPT',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708866993/ktgmxlcgm58lrgudwsqs.jpg'
  ),
  (
    7,
    2,
    'Git <3',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708867022/mxqzonpah3ynfqpk17qr.jpg'
  ),
  (
    7,
    2,
    'ANNOUNCED TODAY: Udemy has partnered with ServiceNow to offer more than 75 power skills courses in their Now Learning platform to complement existing tech training.',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708867440/ioy8me4sbfrgipgsghcr.jpg'
  ),
  (
    6,
    1,
    '3 خطوات تساعدك أن تصبح مبرمجاً

________________________________________
لو مهتم بتطوير مهاراتك لدخول مجال البرمجة
سجل معنا الآن في معسكر أكاديمية ميراكي لـ تعلم البرمجة:
rebrand.ly/MerakiAcademyJO_RFS1
أو تواصل معنا عن طريق الواتس آب على الرابط التالي:
wa.me/962787875915
#MerakiAcademyJO #MerakiAcademy',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708866686/iqbaiguvwchnrcmavshm.jpg'
  ),
  (
    6,
    1,
    'بتدور على شغل؟ بتفكر تغير مسارك المهني وتصير مبرمج؟ ',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708866780/xz75wapwawdcfmocaucx.jpg'
  ),
  (
    7,
    2,
    'HB',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708867489/zawk8quomilwcdmxinnq.jpg'
  ),
  (
    1,
    null,
    'The ICU is where you take someone that has been injured playing PeekaBoo',
    ''
  ),
  (
    2,
    null,
    '
🌟 Diving into the captivating world of Hunter x Hunter today! 🎩🌍 Who else is hooked on this epic adventure? 🌟 #HunterxHunter #AnimeAddict',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890241/jb7ch7ebt3zjjwqupdob.jpg'
  ),
  (
    2,
    null,
    '🎭 Hisoka  enigmatic presence always keeps me on the edge of my seat in Hunter x Hunter! 🃏💥 Who else can not get enough of this captivating character  unpredictability? 🎭 #Hisoka #HunterxHunter',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890228/qddgttfmen4opwwevtf3.jpg'
  ),
  (
    3,
    null,
    '#Nostalgia: Cherishing memories from the good old days. 🌟🕰️',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890456/q3sbfj8wpr5yza0cso3k.jpg'
  ),
  (
    3,
    null,
    '#NostalgiaFeels: Cherishing the simplicity and magic of bygone days! ✨🕰️',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890444/xawh2kkadw515v5sh7tz.webp'
  ),
  (
    4,
    null,
    '🌸 Embracing the beauty of Sakura blossoms in full bloom! 🌸',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890690/qbxykx5b1asfuvbglnet.jpg'
  ),
  (
    4,
    null,
    '🇯🇵 Japan: A land of tradition, innovation, and breathtaking beauty! 🏯🌸',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890706/rstgdjbhfnpplzfucvu1.jpg'
  ),
  (4, null, '', null),
  (
    5,
    null,
    '🌌 Marveling at the vast wonders of the Universe! ✨🌠
',
    null
  ),
  (
    5,
    null,
    '🌟 Exploring the mysteries of the cosmos with Astro! 🚀✨',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890944/n7xlug7tvygdnzhoa2bb.jpg'
  ),
  (
    5,
    null,
    '🛰️ Admiring the International Space Station orbital brilliance above! 🌍✨',
    'http://res.cloudinary.com/dpbh42kjy/image/upload/v1708890962/yg5kj42ut5dhcpjyla3j.avif'
  ) RETURNING *;

-- Create a table called **posts_likes** in the database
DROP TABLE IF EXISTS posts_likes CASCADE;

CREATE TABLE
  posts_likes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE
  );

--! prevent the user from liking the same post multiple times... Frontend and backend
-- insert posts_likes
INSERT INTO
  posts_likes (user_id, post_id)
VALUES
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (2, 11),
  (2, 13),
  (2, 14),
  (3, 3),
  (3, 4),
  (3, 5),
  (3, 7),
  (3, 8),
  (3, 10),
  (3, 13),
  (4, 1),
  (4, 3),
  (4, 2),
  (4, 4),
  (4, 9),
  (4, 12),
  (4, 14),
  (5, 1),
  (5, 2),
  (5, 3),
  (5, 4),
  (5, 6),
  (5, 7),
  (5, 8),
  (7, 6),
  (7, 7),
  (7, 8),
  (7, 10),
  (7, 11),
  (7, 13),
  (7, 14),
  (6, 1),
  (6, 2),
  (6, 3),
  (6, 5),
  (6, 6),
  (6, 7) RETURNING *;

-- Create a table called **shares** in the database
DROP TABLE IF EXISTS shares CASCADE;

CREATE TABLE
  shares (
    id SERIAL PRIMARY KEY NOT NULL,
    post_id INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    -- content VARCHAR(255) DEFAULT 'I share this',
    contentadd VARCHAR(255)
    -- OR page_id INT REFERENCES pages (id) ON DELETE CASCADE
  );

--! check the role if user or page. //////////////////////
-- insert shares
INSERT INTO
  shares (post_id, user_id, contentadd)
VALUES
  (1, 1, 'welcome'),
  (1, 2, 'I share this too'),
  (1, 3, 'I share this too'),
  (1, 4, 'I share this too'),
  (1, 5, 'I share this too'),
  (2, 1, 'I share this too'),
  (2, 2, 'I share this too'),
  (2, 4, 'I share this too'),
  (2, 6, 'I share this too'),
  (2, 7, 'I share this too'),
  (3, 2, 'I share this too'),
  (3, 3, 'I share this too'),
  (3, 4, 'I share this too'),
  (3, 5, 'I share this too'),
  (4, 7, 'I share this too'),
  (6, 1, 'I share this too'),
  (6, 2, 'I share this too'),
  (6, 5, 'I share this too'),
  (6, 7, 'I share this too'),
  (7, 1, 'I share this too'),
  (7, 2, 'I share this too'),
  (7, 3, 'I share this too'),
  (7, 4, 'I share this too'),
  (7, 5, 'I share this too'),
  (7, 6, 'I share this too'),
  (7, 7, 'I share this too'),
  (13, 2, 'I share this too') RETURNING *;

-- INSERT INTO
--   shares (post_id, user_id, page_id)
-- VALUES
--   (1, null, 1),
--   (1, 1, null),
--   (2, 1, null),
--   (2, 2, null) RETURNING *;
--
-- Create a table called **comments** in the database
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE
  comments (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert comments
INSERT INTO
  comments (user_id, post_id, comment)
VALUES
  (
    1,
    1,
    'This is awful, what global pandemic does to traveling business is just horrible.'
  ),
  (
    1,
    4,
    'In order to survive humanity will have to move forward, we must look up in the sky and work on the colonization of other planets.'
  ),
  (
    1,
    5,
    'Joint efforts, countless hours of work, countless bug fixes and now we are here, congratulations everyone.'
  ),
  (
    1,
    10,
    'One of my favorite games, missions are hard, characters have awesome clothing and skins and gameplay is entertaining.'
  ),
  (
    1,
    12,
    'Wow, just stumbled upon this gem! 🌟 Such an interesting perspective, definitely made my day brighter. Keep spreading positivity! 💫 #Inspiration #PositiveVibes'
  ),
  (1, 11, 'This post totally made me smile! 😊'),
  (
    2,
    5,
    'Wow, mind blown by this incredible content! 👏'
  ),
  (
    4,
    1,
    'Love seeing positivity like this on my feed! 💖'
  ),
  (
    4,
    2,
    'Thanks for sharing, always enjoy your posts! 🌟'
  ),
  (5, 2, 'Absolutely loving the vibes here! ✨'),
  (
    3,
    13,
    'Needed this today, thank you for the uplift! 🙌'
  ),
  (3, 8, 'You always bring such great insights! '),
  (
    3,
    11,
    'Can not get enough of your awesome content! 💯'
  ),
  (
    7,
    4,
    'This is what makes my day better, keep em coming! 🌻'
  ),
  (1, 7, 'You never fail to inspire! 💪'),
  (
    1,
    8,
    'our posts are like a breath of fresh air! 🍃'
  ),
  (
    2,
    6,
    'Sending virtual high-fives for this amazing share! 🙏'
  ),
  (
    3,
    9,
    'You have a talent for brightening up timelines! ☀️'
  ),
  (
    2,
    2,
    'This is exactly what I needed to see today. Thank you! 💕'
  ),
  (
    3,
    7,
    'So grateful for your positive presence here! 🌺'
  ),
  (7, 2, 'This post speaks volumes! 🎉'),
  (
    7,
    3,
    'Every time I see your posts, it is a mini celebration! 🎈'
  ),
  (
    5,
    1,
    'Thank you for consistently bringing joy to my feed! 🥳'
  ),
  (
    2,
    1,
    'You are like a ray of sunshine in the digital world! ☀️'
  ),
  (
    1,
    9,
    'Just when I needed a pick-me-up, you deliver! 🌟'
  ),
  (
    6,
    1,
    'Your positivity is contagious! Keep shining bright! ✨'
  ),
  (
    2,
    3,
    'Your posts are a daily dose of inspiration! 💫'
  ),
  (
    1,
    6,
    '"I always look forward to your uplifting content! 🚀'
  ),
  (
    6,
    3,
    'Your perspective always adds so much value! 👍'
  ),
  (
    5,
    3,
    'Thanks for spreading smiles wherever you go! 😄'
  ),
  (
    1,
    13,
    'This is why I love scrolling through my feed! 💖'
  ),
  (
    1,
    2,
    'You have a knack for making ordinary moments extraordinary! '
  ),
  (
    6,
    2,
    'Your positive energy is felt through the screen! 🌟'
  ),
  (
    7,
    1,
    'Keep doing what you are doing, it is making a difference! 🙌'
  ),
  (
    2,
    4,
    'Grateful to have you sharing your positivity here! 🙏'
  ),
  (
    2,
    1,
    'So there is going to be a new season of Rick and Morty, Can’t wait for it. I bet it is going to awesome.'
  ),
  (3, 10, 'This post speaks volumes! 🎉'),
  (1, 3, 'This post speaks volumes! 🎉'),
  (3, 12, 'This post speaks volumes! 🎉') RETURNING *;

-- Create a table called **comment_likes** in the database
DROP TABLE IF EXISTS comment_likes CASCADE;

CREATE TABLE
  comment_likes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    comment_id INT NOT NULL REFERENCES comments (id) ON DELETE CASCADE
  );

--! prevent the user from liking the same comment multiple times... frontend and backend
-- insert comment_likes
INSERT INTO
  comment_likes (user_id, comment_id)
VALUES
  (2, 1),
  (1, 2),
  (1, 1),
  (2, 12),
  (2, 13),
  (2, 14),
  (2, 15),
  (2, 16),
  (2, 17),
  (2, 18),
  (2, 19),
  (2, 11),
  (2, 10),
  (3, 11),
  (3, 12),
  (3, 13),
  (3, 14),
  (3, 15),
  (3, 16),
  (3, 17),
  (3, 18),
  (3, 19),
  (3, 10),
  (3, 1),
  (3, 21),
  (2, 31),
  (4, 1),
  (4, 2),
  (4, 3),
  (4, 4),
  (4, 5),
  (4, 6),
  (4, 7),
  (4, 8),
  (4, 9),
  (4, 10),
  (4, 11),
  (4, 12),
  (4, 13),
  (4, 14),
  (4, 15),
  (4, 16),
  (4, 17),
  (4, 18),
  (4, 19),
  (4, 20),
  (4, 21),
  (4, 22),
  (4, 23),
  (4, 24),
  (4, 25),
  (4, 26),
  (4, 27),
  (4, 28),
  (4, 29),
  (4, 30),
  (4, 31),
  (5, 1),
  (5, 2),
  (5, 3),
  (5, 4),
  (5, 5),
  (5, 6),
  (5, 7),
  (5, 8),
  (5, 9),
  (5, 10),
  (6, 1),
  (6, 2),
  (6, 3),
  (6, 4),
  (6, 5),
  (6, 6),
  (6, 7),
  (6, 8),
  (6, 9),
  (6, 10),
  (7, 1),
  (7, 2),
  (7, 3),
  (7, 4),
  (7, 5),
  (7, 6),
  (7, 7),
  (7, 8),
  (7, 9),
  (7, 10) RETURNING *;