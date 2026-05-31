import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Globe, BookOpen, Users, Video, MapPin, CheckCircle2, 
  Circle, ChevronRight, Menu, X, Search, Filter, Bell, LogOut, Settings, 
  User as UserIcon, PlayCircle, MessageSquare, Award, Briefcase, FileText, 
  ChevronDown, Star, ArrowRight, UploadCloud, Heart, Clock, ThumbsUp, Send, Check, Trash2, Info,
  ArrowLeft, ExternalLink, Calendar, DollarSign, Percent, Activity, FileCheck, SlidersHorizontal, Book, ShieldAlert,
  MonitorPlay, Lightbulb, Bookmark, BarChart, Play
} from 'lucide-react';


const storage = {
  fallback: {},
  get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch (e) {
      return this.fallback[key] || null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      this.fallback[key] = value;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      delete this.fallback[key];
    }
  }
};

const COUNTRIES = ['AQSh', 'Buyuk Britaniya', 'Germaniya', 'Turkiya', 'Janubiy Koreya', 'Yaponiya', 'Kanada', 'Avstraliya', 'Italiya', 'Shveysariya', 'Singapur', 'Xitoy', 'Fransiya', 'Belgiya', 'Niderlandiya', 'Shvetsiya', 'Vengriya'];
const MAJORS = ['IT / Kompyuter fanlari', 'Biznes / Iqtisodiyot', 'Tibbiyot', 'Muhandislik', 'Huquq', 'Dizayn / San’at', 'Hali aniq emas'];

const enrichedUniversitiesData = [
      {
        "id": 1,
        "name": "Massachusetts Institute of Technology (MIT)",
        "country": "AQSh",
        "major": "Engineering & CS",
        "ranking": 1,
        "tuition": "$57,590 / yil",
        "deadline": "2026-11-01",
        "image": "https://news.mit.edu/sites/default/files/images/201806/Aerial-AboveSummit-Christopher%2520Harting_0.png",
        "city": "Cambridge, Boston, MA",
        "overview": "Massachusetts Institute of Technology (MIT) AQShning Massachusetts shtatidagi Cambridge shahrida joylashgan bo‘lib, dunyoning eng yetakchi texnologiya va ilmiy tadqiqot universitetlaridan biri hisoblanadi. 1861-yilda tashkil etilgan ushbu oliygoh “mens et manus” (aqil va qo‘l) tamoyiliga asoslanadi, ya’ni nazariy bilimni amaliy yechimlar bilan uyg‘unlashtirishga urg‘u beradi. MIT kompyuter fanlari, sun’iy intellekt, robototexnika, aerokosmik muhandislik, fizika va matematika kabi yo‘nalishlarda global yetakchi hisoblanadi. Universitetda MIT Media Lab va Lincoln Laboratory kabi ilg‘or tadqiqot markazlari mavjud bo‘lib, ular zamonaviy texnologik inqiloblarga katta hissa qo‘shgan. MIT bitiruvchilari va professorlari minglab startaplar yaratgan, jumladan Dropbox, iRobot va boshqa yirik texnologik kompaniyalar. Universitet NASA, Google va IBM kabi gigantlar bilan yaqin hamkorlik qiladi. MIT dunyo bo‘yicha 100+ mamlakatlardan talabalarni qabul qiladi va juda kuchli tanlov asosida kirish tizimiga ega. Bu universitet innovatsiya, tadbirkorlik va ilmiy kashfiyotlar markazi sifatida global texnologik rivojlanishni shakllantiradi.",
        "cost_of_living": "$18,000 - $24,000 / yil",
        "acceptance_rate": "4.8%",
        "website_link": "https://www.mit.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1530",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 2,
        "name": "University of Cambridge",
        "country": "Buyuk Britaniya",
        "major": "Arts, Sciences & Engineering",
        "ranking": 2,
        "tuition": "£24,500 - £64,000 / yil",
        "deadline": "2026-10-15",
        "image": "https://accommodationforstudents.com/cdn-cgi/image/f=auto,q=85,w=960/https://images.accommodationforstudents.com/website/university-guides/gb/university-of-cambridge/uni.jpg",
        "city": "Cambridge, Angliya",
        "overview": "Cambridge universiteti 1209-yilda Angliyada tashkil etilgan bo‘lib, dunyodagi eng qadimiy va nufuzli universitetlardan biridir. U ilm-fan tarixida juda katta rol o‘ynagan: Isaak Nyutonning klassik mexanika qonunlari, DNK tuzilmasining kashf etilishi kabi yirik ilmiy yutuqlar aynan shu muhit bilan bog‘liq. Universitet kollej tizimi asosida ishlaydi, bu esa talabaga individual yondashuv va yaqin akademik muhit yaratadi. Cambridge fizika, matematika, tibbiyot, muhandislik va tabiiy fanlarda global yetakchilardan biridir. Universitet yuzlab Nobel mukofoti sovrindorlarini yetishtirgan bo‘lib, bu uning ilmiy kuchini tasdiqlaydi. Cambridge tadqiqotlari hozirda sun’iy intellekt, biotexnologiya, iqlim o‘zgarishi va energiya tizimlari kabi sohalarga yo‘naltirilgan. Uning ilmiy park va startap ekotizimi yangi texnologiyalarni rivojlantirishda muhim rol o‘ynaydi. Kampus tarixiy arxitektura va zamonaviy laboratoriyalar uyg‘unligidan iborat bo‘lib, xalqaro talabalar uchun juda kuchli akademik muhit yaratadi.",
        "cost_of_living": "£12,000 - £15,000 / yil",
        "acceptance_rate": "15.5%",
        "website_link": "https://www.cam.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1500",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 3,
        "name": "University of Oxford",
        "country": "Buyuk Britaniya",
        "major": "Humanities, Medicine & Sciences",
        "ranking": 3,
        "tuition": "£28,000 - £48,500 / yil",
        "deadline": "2026-10-15",
        "image": "https://cdn.britannica.com/03/117103-050-F4C2FC83/view-University-of-Oxford-England-Oxfordshire.jpg",
        "city": "Oxford, Angliya",
        "overview": "Oxford universiteti dunyodagi eng qadimiy ingliz tilidagi universitet bo‘lib, 11-asrdan boshlab ta’lim berib keladi. U Buyuk Britaniyaning Oxford shahrida joylashgan va akademik mukammalligi bilan mashhur. Oxford ayniqsa siyosat, falsafa, iqtisod, huquq, tibbiyot va gumanitar fanlar sohasida kuchli hisoblanadi. Universitetning “tutorial system” deb ataladigan o‘qitish tizimi har bir talabaga individual yondashuvni ta’minlaydi, bu esa chuqur bilim olish imkonini beradi. Oxford dunyoning ko‘plab davlat rahbarlari, bosh vazirlari va Nobel mukofoti sovrindorlarini yetishtirgan. Uning ilmiy tadqiqotlari global siyosat, tibbiyot innovatsiyalari va ijtimoiy fanlarga katta ta’sir ko‘rsatadi. Universitetning kuchli kutubxona tizimi va tarixiy kampusi uni akademik jihatdan juda noyob qiladi. Oxford bugungi kunda ham AI, biomeditsina va global siyosat bo‘yicha yetakchi tadqiqot markazlaridan biri hisoblanadi.",
        "cost_of_living": "£13,000 - £16,500 / yil",
        "acceptance_rate": "14.2%",
        "website_link": "https://www.ox.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1510",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 4,
        "name": "Harvard University",
        "country": "AQSh",
        "major": "Law, Medicine, Business & CS",
        "ranking": 4,
        "tuition": "$59,000 / yil",
        "deadline": "2026-11-01",
        "image": "https://image-static.collegedunia.com/public/college_data/images/studyabroad/appImage/college_1090_29-15:00_o-HARVARD-UNIVERSITY-BUILDING-facebook.jpeg",
        "city": "Cambridge, Boston, MA",
        "overview": "Harvard universiteti AQShning eng qadimiy oliygohi bo‘lib, 1636-yilda tashkil etilgan va Ivy League tizimining a’zosi hisoblanadi. U Massachusetts shtatidagi Cambridge shahrida joylashgan. Harvard huquq, tibbiyot, biznes va ijtimoiy fanlar bo‘yicha dunyodagi eng nufuzli universitetlardan biridir. Uning Harvard Business School va Harvard Law School kabi maktablari global ta’lim standartlarini belgilab beradi. Universitet juda katta moliyaviy fondga ega bo‘lib, bu unga ilmiy tadqiqotlar va stipendiyalarni keng qo‘llab-quvvatlash imkonini beradi. Harvard bitiruvchilari orasida ko‘plab prezidentlar, Nobel mukofoti sovrindorlari va global kompaniyalar asoschilari bor. Universitetning ilmiy tadqiqotlari tibbiyot, iqtisodiyot, siyosat va sun’iy intellekt sohalarida katta ta’sirga ega. Uning kampusi akademik an’analar va zamonaviy innovatsiyalar uyg‘unligidan iborat bo‘lib, xalqaro talabalar uchun kuchli ilmiy muhit yaratadi.",
        "cost_of_living": "$20,000 - $25,000 / yil",
        "acceptance_rate": "3.4%",
        "website_link": "https://www.harvard.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1540",
        "gpa_expectation": "4.0 / 4.0"
    },
    {
        "id": 5,
        "name": "Stanford University",
        "country": "AQSh",
        "major": "Tech, Entrepreneurship & CS",
        "ranking": 5,
        "tuition": "$61,730 / yil",
        "deadline": "2026-11-01",
        "image": "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_396,q_75,w_704/v1/crm/sanmateoca/shutterstock_4189008910-9b68011a5056a36_9b6802fa-5056-a36a-0bbb53c8e971b411.jpg",
        "city": "Stanford, California",
        "overview": "Stanford universiteti AQShning California shtatida, Silikon vodiysi markaziga yaqin joylashgan bo‘lib, dunyoning eng innovatsion universitetlaridan biri hisoblanadi. U 1885-yilda tashkil etilgan va texnologiya, tadbirkorlik hamda startap madaniyati bilan mashhur. Google, HP, Netflix kabi yirik kompaniyalar asoschilari aynan shu universitetdan chiqqan. Stanford kompyuter fanlari, sun’iy intellekt, muhandislik va biznes sohalarida global yetakchidir. Universitet Silikon vodiysi ekotizimi bilan chambarchas bog‘langan bo‘lib, talabalar uchun real sanoat loyihalarida qatnashish imkoniyatlari mavjud. Uning tadqiqot markazlari AI, bioengineering va energetika sohalarida innovatsiyalar yaratadi. Stanford kampusi katta, yashil va texnologik infratuzilmaga ega bo‘lib, ijodiy va tadbirkorlik ruhini qo‘llab-quvvatlaydi. Universitet global miqyosda innovatsiya va startaplar markazi sifatida tanilgan.",
        "cost_of_living": "$22,000 - $26,000 / yil",
        "acceptance_rate": "3.9%",
        "website_link": "https://www.stanford.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1520",
        "gpa_expectation": "3.95 / 4.0"
    },
    {
        "id": 6,
        "name": "Imperial College London",
        "country": "Buyuk Britaniya",
        "major": "STEM & Medicine",
        "ranking": 6,
        "tuition": "£35,000 - £45,000 / yil",
        "deadline": "2026-10-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR9SKnZFbWd2Jwu5u_Il7Xzhi_X4hh9W96Xg&s",
        "city": "London, Angliya",
        "overview": "Imperial College London Buyuk Britaniyaning London shahrida joylashgan bo‘lib, faqat STEM (fan, texnologiya, muhandislik va tibbiyot) yo‘nalishlariga ixtisoslashgan elita universitet hisoblanadi. U dunyo bo‘yicha eng kuchli texnik universitetlardan biri sifatida tan olinadi. Imperial ilmiy tadqiqotlari tibbiyot, muhandislik, robototexnika va iqlim texnologiyalari sohalarida juda yuqori darajada. Universitet sanoat bilan juda yaqin hamkorlik qiladi va ko‘plab texnologik innovatsiyalarni ishlab chiqadi. Uning London markazidagi kampusi talabalar uchun global biznes va ilmiy markazlarga yaqinlik beradi. Imperial bitiruvchilari dunyoning yirik kompaniyalari va ilmiy markazlarida yetakchi lavozimlarda ishlaydi. Universitet kuchli laboratoriyalar va tadqiqot institutlariga ega bo‘lib, ilm-fan rivojida muhim rol o‘ynaydi.",
        "cost_of_living": "£15,000 - £20,000 / yil",
        "acceptance_rate": "12.0%",
        "website_link": "https://www.imperial.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "1480",
        "gpa_expectation": "3.85 / 4.0"
    },
    {
        "id": 7,
        "name": "ETH Zurich",
        "country": "Shveytsariya",
        "major": "Engineering & Physics",
        "ranking": 7,
        "tuition": "CHF 1,500 / yil",
        "deadline": "2026-04-30",
        "image": "https://ethz.ch/en/news-and-events/eth-news/news/2025/03/eth-zurich-still-the-worlds-best-university-in-earth-sciences-and-geophysics/_jcr_content/par/lead/imagePanorama.imageformat.carousel.728273641.jpg",
        "city": "Syurix",
        "overview": "ETH Zurich Shveytsariyaning Syurix shahrida joylashgan bo‘lib, Yevropaning eng kuchli texnik universitetlaridan biri hisoblanadi. 1855-yilda tashkil etilgan ushbu universitet Albert Einstein kabi buyuk olimlarni yetishtirgan. ETH Zurich fizika, matematika, muhandislik va kompyuter fanlari sohalarida global yetakchi hisoblanadi. Universitet ilmiy tadqiqotlarga juda katta e’tibor beradi va ko‘plab Nobel mukofoti sovrindorlari shu yerda ishlagan yoki tahsil olgan. ETH innovatsion laboratoriyalari va texnologik markazlari orqali Yevropada muhandislik rivojiga katta ta’sir ko‘rsatadi. Universitet sanoat bilan yaqin hamkorlikda ishlaydi, ayniqsa robototexnika va energiya tizimlari sohalarida. ETH Zurich xalqaro talabalar uchun yuqori sifatli, ammo nisbatan arzon ta’lim imkonini beradi.",
        "cost_of_living": "CHF 20,000 - CHF 25,000 / yil",
        "acceptance_rate": "20.0%",
        "website_link": "https://ethz.ch",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 8,
        "name": "National University of Singapore (NUS)",
        "country": "Singapur",
        "major": "Data Science, CS & Business",
        "ranking": 8,
        "tuition": "$30,000 - $40,000 / yil",
        "deadline": "2026-03-15",
        "image": "https://edunirvana.in/wp-content/uploads/2025/07/Education_Resource_Centre_02-scaled.jpg",
        "city": "Singapur",
        "overview": "NUS Singapurning eng nufuzli universiteti bo‘lib, Osiyoda 1-o‘rinda turadigan oliygohlardan biridir. U kompyuter fanlari, sun’iy intellekt, biznes va muhandislik sohalarida global yetakchi hisoblanadi. Universitet Osiyo va G‘arb ta’lim tizimini uyg‘unlashtirgan holda juda kuchli akademik muhit yaratadi. NUS tadqiqot markazlari AI, biotexnologiya va smart shahar texnologiyalari bo‘yicha ishlaydi. Universitet ko‘plab xalqaro kompaniyalar bilan hamkorlik qiladi va talabalar uchun amaliy tajriba imkoniyatlarini taqdim etadi. Singapur iqtisodiy markaz bo‘lgani uchun NUS bitiruvchilari global ish bozori uchun juda talabgir hisoblanadi.",
        "cost_of_living": "$12,000 - $18,000 / yil",
        "acceptance_rate": "5.0%",
        "website_link": "https://nus.edu.sg",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "1500",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 9,
        "name": "University College London (UCL)",
        "country": "Buyuk Britaniya",
        "major": "Multidisciplinary & Medicine",
        "ranking": 9,
        "tuition": "£25,000 - £38,000 / yil",
        "deadline": "2026-01-28",
        "image": "https://www.russellgroup.ac.uk/sites/default/files/2025-01/UCLs%20Summer%20Celebration-153%20%281%29.jpg",
        "city": "London, Angliya",
        "overview": "UCL London markazida joylashgan bo‘lib, dunyodagi eng ko‘p yo‘nalishli tadqiqot universitetlaridan biridir. U tibbiyot, psixologiya, arxitektura, huquq va muhandislik sohalarida juda kuchli. UCL ko‘plab ilmiy kashfiyotlar va innovatsiyalarga hissa qo‘shgan. Universitet xalqaro talabalar uchun juda ochiq va global akademik muhitga ega. Uning tadqiqotlari shahar rivojlanishi, sog‘liqni saqlash va AI sohalarida muhim rol o‘ynaydi. London markazidagi joylashuvi talabalar uchun katta imkoniyatlar yaratadi.",
        "cost_of_living": "£16,000 - £21,000 / yil",
        "acceptance_rate": "13.5%",
        "website_link": "https://www.ucl.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "1450",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 10,
        "name": "University of California, Berkeley",
        "country": "AQSh",
        "major": "Data Science, Physics & CS",
        "ranking": 10,
        "tuition": "$44,000 / yil",
        "deadline": "2026-11-30",
        "image": "https://www.tclf.org/sites/default/files/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg",
        "city": "Berkeley, California",
        "overview": "UC Berkeley AQShning eng kuchli davlat universitetlaridan biri bo‘lib, Kaliforniyada joylashgan. U kompyuter fanlari, fizika, iqtisod va kimyo sohalarida dunyo yetakchilaridan biridir. Berkeley tarixan ijtimoiy harakatlar va ilmiy innovatsiyalar markazi bo‘lib kelgan. Universitetdan ko‘plab Nobel mukofoti sovrindorlari va yirik ilmiy kashfiyotlar chiqqan. Uning tadqiqotlari AI, energetika va ekologiya sohalarida juda kuchli. Berkeley Silikon vodiysiga yaqinligi sababli texnologik sanoat bilan juda integratsiyalashgan.",
        "cost_of_living": "$18,000 - $23,000 / yil",
        "acceptance_rate": "11.4%",
        "website_link": "https://www.berkeley.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "1490",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 11,
        "name": "University of Chicago",
        "country": "AQSh",
        "major": "Economics & Social Sciences",
        "ranking": 11,
        "tuition": "$64,000 / yil",
        "deadline": "2026-11-01",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwH2x9K5cln96mbq2UhRVab89hTWgfCwM9Q&s",
        "city": "Chicago, Illinois",
        "overview": "University of Chicago AQShning Illinois shtatidagi Chicago shahrida joylashgan bo‘lib, dunyodagi eng kuchli akademik va tadqiqotga yo‘naltirilgan universitetlardan biri hisoblanadi. U ayniqsa iqtisodiyot, sotsiologiya, huquq va matematik mantiq sohalarida global yetakchi sifatida tanilgan. “Chicago School of Economics” deb ataladigan iqtisodiy maktab aynan shu universitetda shakllangan va u erkin bozor iqtisodiyoti nazariyalariga katta ta’sir ko‘rsatgan. Universitetning akademik muhiti juda intensiv bo‘lib, talabalar kuchli analitik fikrlash va tanqidiy yondashuvga o‘rgatiladi. Uning professorlari va bitiruvchilari orasida ko‘plab Nobel mukofoti sovrindorlari mavjud, ayniqsa iqtisodiyot yo‘nalishida. Chicago universiteti ilmiy tadqiqotlarda nazariy chuqurlik va matematik aniqlikka katta e’tibor beradi. Kampus Hyde Park hududida joylashgan bo‘lib, klassik gotik arxitektura va zamonaviy ilmiy markazlar uyg‘unlashgan. Universitetning Booth School of Business va Law School kabi maktablari global miqyosda juda yuqori baholanadi.",
        "cost_of_living": "$19,000 - $23,000 / yil",
        "acceptance_rate": "4.7%",
        "website_link": "https://www.uchicago.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1520",
        "gpa_expectation": "3.95 / 4.0"
    },
    {
        "id": 12,
        "name": "University of Pennsylvania (UPenn)",
        "country": "AQSh",
        "major": "Business, Finance & Wharton",
        "ranking": 12,
        "tuition": "$60,920 / yil",
        "deadline": "2026-11-01",
        "image": "https://media.cntraveler.com/photos/5c1137222a1ed14acdea31a2/16:9/w_2560%2Cc_limit/GettyImages-594949892.jpg",
        "city": "Philadelphia, Pennsylvania",
        "overview": "University of Pennsylvania AQShning Filadelfiya shahrida joylashgan Ivy League universiteti bo‘lib, 1740-yilda Benjamin Franklin tomonidan asos solingan. UPenn dunyodagi eng kuchli biznes maktablaridan biri — Wharton School bilan mashhur. Universitet biznes, moliya, tibbiyot, huquq va ijtimoiy fanlar sohalarida yetakchi hisoblanadi. Wharton global korporativ liderlarni tayyorlaydigan eng nufuzli biznes maktablaridan biridir. UPenn interdisiplinar ta’limga katta e’tibor beradi, ya’ni talabalar turli fakultetlardan kurslar kombinatsiyasini tanlashlari mumkin. Universitetning tadqiqot markazlari sog‘liqni saqlash, sun’iy intellekt va iqtisodiy tahlil sohalarida kuchli. UPenn bitiruvchilari global moliya, texnologiya va siyosat sohalarida yuqori lavozimlarda ishlaydi. Kampus Filadelfiya markaziga yaqin bo‘lib, talabalar uchun professional imkoniyatlarga boy muhit yaratadi.",
        "cost_of_living": "$18,500 - $22,500 / yil",
        "acceptance_rate": "5.9%",
        "website_link": "https://www.upenn.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1530",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 13,
        "name": "Cornell University",
        "country": "AQSh",
        "major": "Engineering & Agriculture",
        "ranking": 13,
        "tuition": "$65,200 / yil",
        "deadline": "2026-11-01",
        "image": "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_435,q_65,w_615/v1/crm/ithacany/225-1_08698984-5056-a36a-09bcd50667c56994.jpg",
        "city": "Ithaca, New York",
        "overview": "Cornell University AQShning New York shtatidagi Ithaca shahrida joylashgan Ivy League universiteti bo‘lib, 1865-yilda tashkil etilgan. U muhandislik, kompyuter fanlari, qishloq xo‘jaligi va mehmonxona boshqaruvi sohalarida kuchli akademik dasturlarga ega. Cornell boshqa Ivy League universitetlaridan farqli ravishda amaliy va texnik yo‘nalishlarga ham katta e’tibor beradi. Uning Cornell Tech kampusi Nyu-York shahrida joylashgan bo‘lib, texnologiya va startaplar bilan bevosita integratsiyalashgan. Universitetning tadqiqotlari biologiya, sun’iy intellekt va barqaror rivojlanish sohalarida juda kuchli. Cornell ko‘plab Nobel mukofoti sovrindorlarini yetishtirgan va ilmiy innovatsiyalarda muhim rol o‘ynagan. Kampus tabiiy go‘zallikka ega hududda joylashgan bo‘lib, talabalar uchun tinch va ilmiy muhit yaratadi.",
        "cost_of_living": "$17,000 - $21,000 / yil",
        "acceptance_rate": "7.3%",
        "website_link": "https://www.cornell.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1510",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 14,
        "name": "The University of Melbourne",
        "country": "Avstraliya",
        "major": "Education, Law & Medicine",
        "ranking": 14,
        "tuition": "$35,000 - $50,000 / yil",
        "deadline": "2026-10-31",
        "image": "https://international.tdtu.edu.vn/sites/international/files/International/Parkville_-_University_of_Melbourne_(Queen%E2%80%99s_College).jpg",
        "city": "Melburn",
        "overview": "University of Melbourne Avstraliyaning eng nufuzli universitetlaridan biri bo‘lib, 1853-yilda tashkil etilgan. U global reytinglarda doimiy ravishda yuqori o‘rinlarni egallaydi. Universitet tibbiyot, huquq, ta’lim, muhandislik va ijtimoiy fanlar sohalarida kuchli. Melbourne University ilmiy tadqiqotlarga katta e’tibor beradi va Avstraliya iqtisodiy va ijtimoiy rivojlanishida muhim rol o‘ynaydi. Uning tibbiyot maktabi dunyo bo‘yicha yuqori darajada tan olingan. Universitet xalqaro talabalar uchun juda katta imkoniyatlar yaratadi va multikultural akademik muhitga ega. Kampus zamonaviy infratuzilma va tarixiy binolar uyg‘unligidan iborat.",
        "cost_of_living": "$18,000 - $24,000 / yil",
        "acceptance_rate": "12.0%",
        "website_link": "https://www.unimelb.edu.au",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 15,
        "name": "California Institute of Technology (Caltech)",
        "country": "AQSh",
        "major": "Space Science, Physics & Engineering",
        "ranking": 15,
        "tuition": "$60,800 / yil",
        "deadline": "2026-11-01",
        "image": "https://edunirvana.in/wp-content/uploads/2025/07/GettyImages-458411541-7cc7187ad6e94a52a77b63ec40088605.jpg",
        "city": "Pasadena, California",
        "overview": "Caltech AQShning California shtatidagi Pasadena shahrida joylashgan kichik, ammo juda elita ilmiy tadqiqot universitetidir. U fizika, matematika, kimyo, muhandislik va kosmik ilm-fan sohalarida dunyo yetakchisi hisoblanadi. NASA Jet Propulsion Laboratory (JPL) bilan yaqin hamkorlik Caltechni kosmik tadqiqotlarda markaziy o‘ringa olib chiqqan. Universitet juda kichik talabalar soniga ega, bu esa individual ilmiy yondashuvni kuchaytiradi. Caltech ilmiy aniqlik va fundamental tadqiqotlarga juda katta urg‘u beradi. Ko‘plab Nobel mukofoti sovrindorlari shu universitet bilan bog‘liq. Kampus juda ixcham, ammo ilmiy jihatdan nihoyatda kuchli muhitga ega.",
        "cost_of_living": "$19,000 - $24,000 / yil",
        "acceptance_rate": "3.1%",
        "website_link": "https://www.caltech.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1550",
        "gpa_expectation": "3.98 / 4.0"
    },
    {
        "id": 16,
        "name": "Yale University",
        "country": "AQSh",
        "major": "Law, Arts & Humanities",
        "ranking": 16,
        "tuition": "$64,700 / yil",
        "deadline": "2026-11-01",
        "image": "https://a.storyblok.com/f/64062/1200x676/0121c6cae0/how-to-get-into-yale.jpg",
        "city": "New Haven, Connecticut",
        "overview": "Yale University AQShning Connecticut shtatidagi New Haven shahrida joylashgan Ivy League universiteti bo‘lib, 1701-yilda tashkil etilgan. U huquq, san’at, gumanitar fanlar va siyosatshunoslik sohalarida dunyodagi eng kuchli universitetlardan biridir. Yale Law School global huquqiy ta’limda yetakchi hisoblanadi. Universitetning san’at va drama dasturlari ham juda mashhur. Yale kuchli kollej tizimiga ega bo‘lib, talabalar kichik akademik jamoalarda o‘qiydi. Uning kutubxona tizimi AQShdagi eng yiriklardan biridir. Yale ko‘plab prezidentlar, sudyalar va Nobel mukofoti sovrindorlarini yetishtirgan.",
        "cost_of_living": "$19,500 - $23,500 / yil",
        "acceptance_rate": "4.5%",
        "website_link": "https://www.yale.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1530",
        "gpa_expectation": "3.95 / 4.0"
    },
    {
        "id": 17,
        "name": "Peking University",
        "country": "Xitoy",
        "major": "Linguistics, Sciences & Tech",
        "ranking": 17,
        "tuition": "$5,000 - $8,000 / yil",
        "deadline": "2026-02-28",
        "image": "https://techportal.in/wp-content/uploads/2023/10/peking-university-1695573947-1024x576.jpg",
        "city": "Pekin",
        "overview": "Peking University Xitoyning Pekin shahrida joylashgan eng nufuzli universitetlardan biri bo‘lib, 1898-yilda tashkil etilgan. U Xitoydagi akademik va intellektual rivojlanish markazi hisoblanadi. Universitet ijtimoiy fanlar, tilshunoslik, tabiiy fanlar va texnologiya sohalarida kuchli. Peking University Xitoyning siyosiy va ilmiy elitasini tayyorlaydi. Uning tadqiqotlari iqtisodiyot, sun’iy intellekt va global siyosat sohalarida muhim ahamiyatga ega. Kampus Pekindagi eng chiroyli tarixiy universitet kampuslaridan biridir. Universitet xalqaro talabalar uchun keng stipendiya imkoniyatlariga ega.",
        "cost_of_living": "$8,000 - $12,000 / yil",
        "acceptance_rate": "1.0%",
        "website_link": "https://english.pku.edu.cn",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1450",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 18,
        "name": "Princeton University",
        "country": "AQSh",
        "major": "Mathematics, Physics & Economics",
        "ranking": 18,
        "tuition": "$59,710 / yil",
        "deadline": "2026-11-01",
        "image": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/princeton-university-main-building-at-front-gate-geraldine-scull.jpg",
        "city": "Princeton, New Jersey",
        "overview": "Princeton University AQShning New Jersey shtatida joylashgan Ivy League universiteti bo‘lib, 1746-yilda tashkil etilgan. U matematika, fizika, iqtisod va gumanitar fanlar bo‘yicha dunyodagi eng kuchli tadqiqot markazlaridan biridir. Princeton bakalavr ta’limiga juda katta e’tibor beradi va kichik sinflar tizimiga ega. Universitet Albert Einstein bilan tarixan bog‘liq bo‘lib, Advanced Study Institute ilmiy markazi bilan mashhur. Princeton ilmiy tadqiqotlarda nazariy yondashuvga katta urg‘u beradi. Kampus juda sokin va akademik muhitga ega.",
        "cost_of_living": "$18,500 - $22,000 / yil",
        "acceptance_rate": "4.0%",
        "website_link": "https://www.princeton.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1540",
        "gpa_expectation": "3.95 / 4.0"
    },
    {
        "id": 19,
        "name": "The University of New South Wales (UNSW Sydney)",
        "country": "Avstraliya",
        "major": "Engineering & Business",
        "ranking": 19,
        "tuition": "$33,000 - $48,000 / yil",
        "deadline": "2026-11-30",
        "image": "https://images-intl.prod.aws.idp-connect.com/commimg/myhotcourses/institution/CH/myhc_265894.jpg",
        "city": "Sidney",
        "overview": "UNSW Sydney Avstraliyaning eng innovatsion universitetlaridan biri bo‘lib, muhandislik, biznes va texnologiya sohalarida kuchli. Universitet sanoat bilan yaqin hamkorlik qiladi va ko‘plab startap loyihalarini qo‘llab-quvvatlaydi. UNSW quyosh energiyasi va barqaror texnologiyalar bo‘yicha global yetakchilardan biridir. Uning bitiruvchilari Avstraliya iqtisodiyotida muhim rol o‘ynaydi.",
        "cost_of_living": "$19,000 - $25,000 / yil",
        "acceptance_rate": "25.0%",
        "website_link": "https://www.unsw.edu.au",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.6 / 4.0"
    },
    {
        "id": 20,
        "name": "The University of Sydney",
        "country": "Avstraliya",
        "major": "Medicine, Law & Architecture",
        "ranking": 20,
        "tuition": "$36,000 - $51,000 / yil",
        "deadline": "2026-10-31",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BmOUbrls1a5Iz3w2zQbNMfluhX07stxn0Q&s",
        "city": "Sidney",
        "overview": "University of Sydney Avstraliyaning eng qadimiy universiteti bo‘lib, 1850-yilda tashkil etilgan. Sidney shahrida joylashgan bu universitet “Group of Eight” tadqiqot universitetlari orasida yetakchi o‘rinlardan birini egallaydi. U ayniqsa tibbiyot, huquq, arxitektura va biznes yo‘nalishlarida kuchli akademik obro‘ga ega. Universitetning kampusi dunyodagi eng chiroyli universitet kampuslaridan biri sifatida tanilgan, gotik va zamonaviy arxitektura uyg‘unlashgan. University of Sydney Avstraliyaning sog‘liqni saqlash tizimi va siyosatiga katta ilmiy ta’sir ko‘rsatadi. Uning tadqiqotlari saraton, immunologiya va bioinjeneriya sohalarida juda kuchli. Talabalar uchun kuchli sanoat aloqalari va amaliy tajriba imkoniyatlari mavjud.",
        "cost_of_living": "$20,000 - $26,000 / yil",
        "acceptance_rate": "30.0%",
        "website_link": "https://www.sydney.edu.au",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.6 / 4.0"
    },
    {
        "id": 21,
        "name": "University of Toronto",
        "country": "Kanada",
        "major": "Artificial Intelligence & Medicine",
        "ranking": 21,
        "tuition": "$45,000 - $65,000 / yil",
        "deadline": "2026-01-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFabbEYll-XKzZBuUCAJ6W7YIJ5vX4Ckprbg&s",
        "city": "Toronto",
        "overview": "University of Toronto Kanadaning eng yirik va eng nufuzli universiteti bo‘lib, 1827-yilda tashkil etilgan. U Shimoliy Amerikadagi eng kuchli tadqiqot markazlaridan biri hisoblanadi. Ayniqsa sun’iy intellekt, mashina o‘rganish, tibbiyot va bioinformatika sohalarida global yetakchi. Geoffrey Hinton kabi AI asoschilaridan biri aynan shu yerda ishlagan. Universitet uchta yirik kampusga ega va juda keng ilmiy infratuzilmaga ega. Toronto shahri texnologiya va biznes markazi bo‘lgani uchun talabalar uchun amaliy imkoniyatlar juda ko‘p. Universitet global ilmiy hamkorlik tarmoqlarida muhim o‘rin egallaydi.",
        "cost_of_living": "$15,000 - $20,000 / yil",
        "acceptance_rate": "43.0%",
        "website_link": "https://www.utoronto.ca",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "1450",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 22,
        "name": "Tsinghua University",
        "country": "Xitoy",
        "major": "Engineering, CS & Tech",
        "ranking": 22,
        "tuition": "$4,500 - $7,500 / yil",
        "deadline": "2026-03-01",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuW7W0NMRibjwjkzPdPtOWBaemsHNNOzntw&s",
        "city": "Pekin",
        "overview": "Tsinghua University Xitoyning Pekin shahrida joylashgan va mamlakatning eng kuchli texnologik universiteti hisoblanadi. 1911-yilda tashkil etilgan bu universitet muhandislik va kompyuter fanlari bo‘yicha dunyoda yuqori o‘rinlarda turadi. U ko‘pincha “Xitoy MIT’i” deb ataladi. Tsinghua AI, robototexnika, energiya tizimlari va elektronika sohalarida juda kuchli ilmiy markazlarga ega. Universitet Xitoyning texnologik rivojlanish strategiyasida markaziy rol o‘ynaydi. Uning bitiruvchilari orasida siyosiy liderlar va global texnologiya kompaniyalari rahbarlari bor. Kampus juda katta va ilmiy jihatdan juda raqobatbardosh muhitga ega.",
        "cost_of_living": "$8,000 - $11,000 / yil",
        "acceptance_rate": "1.0%",
        "website_link": "https://www.tsinghua.edu.cn",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1480",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 23,
        "name": "Nanyang Technological University (NTU)",
        "country": "Singapur",
        "major": "Material Sciences & Engineering",
        "ranking": 23,
        "tuition": "$28,000 - $38,000 / yil",
        "deadline": "2026-01-15",
        "image": "https://www.ntu.edu.sg/media/images/default-source/cco/the-hive_ntu-singapore5e96d95f-5800-4a3c-84e2-b3fc04f9ce2d-(2).jpg?sfvrsn=5d4af01d_1",
        "city": "Singapur",
        "overview": "NTU Singapurdagi eng kuchli texnologik universitetlardan biri bo‘lib, 1991-yilda tashkil etilgan. U muhandislik, materialshunoslik va sun’iy intellekt sohalarida global darajada tanilgan. NTU “yashil kampus” konsepsiyasi bilan mashhur bo‘lib, ekologik dizayn asosida qurilgan. Universitet sanoat bilan juda yaqin ishlaydi, ayniqsa elektronika va energiya texnologiyalarida. Uning laboratoriyalari dunyodagi eng zamonaviy tadqiqot markazlaridan biridir. NTU Osiyoda innovatsiya va startaplar uchun muhim markaz hisoblanadi.",
        "cost_of_living": "$12,000 - $16,000 / yil",
        "acceptance_rate": "15.0%",
        "website_link": "https://www.ntu.edu.sg",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1460",
        "gpa_expectation": "3.85 / 4.0"
    },
    {
        "id": 24,
        "name": "The University of Hong Kong (HKU)",
        "country": "Gongkong",
        "major": "Business, Dentistry & Law",
        "ranking": 24,
        "tuition": "$22,000 - $25,000 / yil",
        "deadline": "2026-02-20",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl0QJ8aivKrAeIBpvYcS31c6ENPzhURQiqg&s",
        "city": "Gongkong",
        "overview": "HKU Gonkongdagi eng qadimiy universitet bo‘lib, 1911-yilda tashkil etilgan. U Osiyodagi eng nufuzli universitetlardan biri sifatida global reytinglarda yuqori o‘rinlarni egallaydi. HKU tibbiyot, huquq, biznes va stomatologiya sohalarida juda kuchli. Universitet ingliz tilida ta’lim beradi, bu esa uni xalqaro talabalar uchun juda jozibador qiladi. HKU Gonkongning global moliyaviy markaz sifatidagi rolidan foydalanib, talabalariga kuchli amaliy imkoniyatlar yaratadi. Uning tadqiqotlari sog‘liqni saqlash va shahar rivojlanishiga katta ta’sir ko‘rsatadi.",
        "cost_of_living": "$10,000 - $15,000 / yil",
        "acceptance_rate": "10.0%",
        "website_link": "https://www.hku.hk",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1450",
        "gpa_expectation": "3.75 / 4.0"
    },
    {
        "id": 25,
        "name": "University of Tokyo",
        "country": "Yaponiya",
        "major": "Physics, Engineering & Robotics",
        "ranking": 25,
        "tuition": "¥535,800 / yil",
        "deadline": "2026-01-05",
        "image": "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/organizations/5d2656f1-9162-461d-88c7-b2505623d8cb/images/1RYJct8jHCTWAgy3U2RhMk.jpeg",
        "city": "Tokio",
        "overview": "University of Tokyo Yaponiya poytaxti Tokioda joylashgan va mamlakatning eng nufuzli universiteti hisoblanadi. 1877-yilda tashkil etilgan bu universitet Yaponiya ilmiy va siyosiy elitasi markazi hisoblanadi. U fizika, muhandislik, robototexnika va tabiiy fanlarda global yetakchi. Universitet ko‘plab Nobel mukofoti sovrindorlarini yetishtirgan. Uning tadqiqotlari kosmik ilm-fan va ilg‘or texnologiyalarga yo‘naltirilgan. Tokio shahridagi joylashuvi talabalar uchun sanoat va ilmiy markazlarga bevosita kirish imkonini beradi.",
        "cost_of_living": "¥1,500,000 - ¥2,000,000 / yil",
        "acceptance_rate": "34.2%",
        "website_link": "https://www.u-tokyo.ac.jp",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 26,
        "name": "ÉCOLE POLYTECHNIQUE FÉDÉRALE DE LAUSANNE (EPFL)",
        "country": "Shveytsariya",
        "major": "Computer Science & Bio-Tech",
        "ranking": 26,
        "tuition": "CHF 1,560 / yil",
        "deadline": "2026-04-30",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e2/EPFL_campus_2017.jpg",
        "city": "Lozanna",
        "overview": "EPFL Shveytsariyaning Lozanna shahrida joylashgan va Yevropadagi eng innovatsion texnologik universitetlardan biri hisoblanadi. U kompyuter fanlari, bioinjeneriya va robototexnika bo‘yicha global yetakchi markazdir. EPFL juda kuchli startap ekotizimiga ega bo‘lib, ko‘plab texnologik kompaniyalar shu yerda yaratilgan. Universitet sun’iy intellekt, energiya va materialshunoslik bo‘yicha ilg‘or tadqiqotlar olib boradi. Uning kampusi zamonaviy arxitektura va yuqori texnologik laboratoriyalar bilan jihozlangan. EPFL innovatsiya va ilm-fan integratsiyasi bilan mashhur.",
        "cost_of_living": "CHF 19,000 - CHF 24,000 / yil",
        "acceptance_rate": "21.0%",
        "website_link": "https://www.epfl.ch",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.75 / 4.0"
    },
    {
        "id": 27,
        "name": "Columbia University",
        "country": "AQSh",
        "major": "Journalism, Economics & CS",
        "ranking": 27,
        "tuition": "$65,000 / yil",
        "deadline": "2026-11-01",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ea0yFx7bpq6wDxSM3TuNOZ914Vbc8UY7Wg&s",
        "city": "New York City, NY",
        "overview": "Columbia University AQShning Nyu-York shahrida joylashgan Ivy League universiteti bo‘lib, 1754-yilda tashkil etilgan. U jurnalistika, xalqaro munosabatlar, biznes va huquq sohalarida global yetakchi hisoblanadi. Columbia Pulitser mukofotini boshqaradi, bu uni jurnalistika markazi sifatida juda nufuzli qiladi. Universitet Manxetten markazida joylashgani sababli talabalar global moliya va media markaziga bevosita yaqin. Uning tadqiqotlari siyosat, tibbiyot va ijtimoiy fanlarga katta ta’sir ko‘rsatadi. Columbia dunyo miqyosida elita tarmoqlariga ega.",
        "cost_of_living": "$21,000 - $26,000 / yil",
        "acceptance_rate": "3.9%",
        "website_link": "https://www.columbia.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1520",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 28,
        "name": "University of Manchester",
        "country": "Buyuk Britaniya",
        "major": "Physics, Materials & Business",
        "ranking": 28,
        "tuition": "£26,000 - £35,000 / yil",
        "deadline": "2026-01-28",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRleuSZS4zODC-ritFwFzkjSDsZ4wy5BPaT7g&s",
        "city": "Manchester, Angliya",
        "overview": "University of Manchester Buyuk Britaniyaning eng yirik tadqiqot universitetlaridan biri bo‘lib, 1824-yilda tashkil etilgan. U fizika, kimyo, muhandislik va materialshunoslik sohalarida kuchli ilmiy an’anaga ega. Grafen materiali aynan shu universitetda kashf etilgan. Manchester universiteti sanoat bilan kuchli hamkorlik qiladi. Uning kampusi tarixiy va zamonaviy binolar uyg‘unligidan iborat. Universitet innovatsiya va amaliy tadqiqotlarga juda katta e’tibor beradi.",
        "cost_of_living": "£11,000 - £14,000 / yil",
        "acceptance_rate": "16.1%",
        "website_link": "https://www.manchester.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1420",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 29,
        "name": "Seoul National University",
        "country": "Janubiy Koreya",
        "major": "Chemical Engineering & Tech",
        "ranking": 29,
        "tuition": "$6,000 - $9,000 / yil",
        "deadline": "2026-03-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-PLbpj2zX6yRwBRrPcWy5B8cgA_LEy4W6w&s",
        "city": "Seul",
        "overview": "SNU Janubiy Koreyaning eng nufuzli universiteti bo‘lib, Seul shahrida joylashgan. U mamlakatning akademik elitasi va davlat rahbarlarini tayyorlaydigan asosiy markazdir. SNU muhandislik, tibbiyot, kimyo va ijtimoiy fanlarda juda kuchli. Universitet Samsung, LG va Hyundai kabi yirik kompaniyalar bilan yaqin hamkorlik qiladi. Uning tadqiqotlari yuqori texnologiyalar va biofanlarga yo‘naltirilgan. SNU Koreyaning ilmiy va iqtisodiy rivojlanishida markaziy rol o‘ynaydi.",
        "cost_of_living": "$10,000 - $14,000 / yil",
        "acceptance_rate": "13.8%",
        "website_link": "https://www.snu.ac.kr",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1440",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 30,
        "name": "Australian National University",
        "country": "Avstraliya",
        "major": "International Relations & Politics",
        "ranking": 30,
        "tuition": "$38,000 - $46,000 / yil",
        "deadline": "2026-11-15",
        "image": "https://world.uz/files/242_820709hu.jpg",
        "city": "Kanberra",
        "overview": "ANU Avstraliyaning Kanberra shahrida joylashgan va mamlakatning eng kuchli tadqiqot universiteti hisoblanadi. U siyosatshunoslik, xalqaro munosabatlar, iqtisodiyot va fizika sohalarida global yetakchi. ANU Avstraliya hukumati bilan yaqin joylashgani sababli strategik tadqiqotlarda katta rol o‘ynaydi. Universitet Nobel mukofoti sovrindorlarini ham yetishtirgan. Uning kampusi tinch va ilmiy muhitga ega. ANU xalqaro siyosat va global tadqiqotlarda muhim markaz hisoblanadi.",
        "cost_of_living": "$18,000 - $23,000 / yil",
        "acceptance_rate": "35.0%",
        "website_link": "https://www.anu.edu.au",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 31,
        "name": "McGill University",
        "country": "Kanada",
        "major": "Medicine, Neuroscience & Law",
        "ranking": 31,
        "tuition": "$35,000 - $55,000 / yil",
        "deadline": "2026-01-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoKLlDgAO1olTmJpg0UWYnwvcVL-esYPX6Kw&s",
        "city": "Monreal, Kvebek",
        "overview": "McGill University Kanadaning Monreal shahrida joylashgan va 1821-yilda tashkil etilgan. U Shimoliy Amerikadagi eng kuchli tadqiqot universitetlaridan biri bo‘lib, “Kanadaning Garvardi” sifatida ham tanilgan. McGill ayniqsa tibbiyot, neyrofanlar, biologiya va huquq sohalarida global darajada juda kuchli obro‘ga ega. Uning tibbiyot fakulteti Kanada sog‘liqni saqlash tizimiga katta ilmiy va klinik ta’sir ko‘rsatadi. Universitetda tadqiqot yo‘nalishi juda kuchli bo‘lib, talabalar erta bosqichdan laboratoriyalarda ishlash imkoniga ega. Monreal shahri ikki tilli (ingliz va fransuz) muhitda bo‘lgani uchun talabalar uchun madaniy va lingvistik jihatdan boy tajriba yaratadi. McGill bitiruvchilari dunyo bo‘ylab tibbiyot, huquq va ilmiy tadqiqotlarda yetakchi lavozimlarga ega bo‘lishadi.",
        "cost_of_living": "$14,000 - $19,000 / yil",
        "acceptance_rate": "39.0%",
        "website_link": "https://www.mcgill.ca",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1440",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 32,
        "name": "The Hong Kong University of Science and Technology (HKUST)",
        "country": "Gongkong",
        "major": "Business Analytics & CS",
        "ranking": 32,
        "tuition": "$20,000 - $23,000 / yil",
        "deadline": "2026-01-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnjUPNu9BZ4k0U1XRQm44ULsJZwQWWlrTivA&s",
        "city": "Gongkong",
        "overview": "HKUST Gonkongda joylashgan nisbatan yosh, ammo juda tez rivojlangan universitetdir. 1991-yilda tashkil etilgan bo‘lsa ham, u allaqachon Osiyoning eng kuchli texnologik universitetlaridan biri hisoblanadi. HKUST biznes analitika, kompyuter fanlari, sun’iy intellekt va moliya texnologiyalari sohalarida global darajada tanilgan. Universitet Shenchjen va Gonkong texnologik ekotizimlari bilan juda yaqin integratsiyalashgan. Uning kampusi dengizga qaragan tepalikda joylashgan bo‘lib, zamonaviy va innovatsion infratuzilmaga ega. HKUST talabalariga startaplar va sanoat bilan bevosita ishlash imkoniyatlarini taqdim etadi. Bitiruvchilari global banklar, Big Tech kompaniyalar va startaplarda yuqori lavozimlarga chiqadi.",
        "cost_of_living": "$11,000 - $14,000 / yil",
        "acceptance_rate": "12.0%",
        "website_link": "https://hkust.edu.hk",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1430",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 33,
        "name": "Kyoto University",
        "country": "Yaponiya",
        "major": "Chemistry, Biology & Sciences",
        "ranking": 33,
        "tuition": "¥535,800 / yil",
        "deadline": "2026-01-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMkYYL9JSXZZviaC9s-WT-rtl1gu50FoRkA&s",
        "city": "Kioto",
        "overview": "Kyoto University Yaponiyaning eng nufuzli va ilmiy jihatdan eng hurmatli universitetlaridan biridir. 1897-yilda tashkil etilgan bu universitet erkin fikrlash va fundamental tadqiqotlar falsafasiga asoslangan. U fizika, kimyo, biologiya va matematika sohalarida dunyo darajasidagi ilmiy markaz hisoblanadi. Kyoto University bilan bog‘liq olimlar orasida ko‘plab Nobel mukofoti sovrindorlari mavjud. Universitet ilmiy mustaqillikni juda yuqori qo‘yadi va talabalarni ijodiy fikrlashga undaydi. Uning kampusi Kyoto shahrining tarixiy va madaniy muhitida joylashgan bo‘lib, ilm-fan va an’ana uyg‘unligini yaratadi. Bu universitet Yaponiyaning eng kuchli ilmiy tadqiqot markazlaridan biridir.",
        "cost_of_living": "¥1,200,000 - ¥1,700,000 / yil",
        "acceptance_rate": "38.0%",
        "website_link": "https://www.kyoto-u.ac.jp",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.75 / 4.0"
    },
    {
        "id": 34,
        "name": "Northwestern University",
        "country": "AQSh",
        "major": "Marketing, Journalism & MBA",
        "ranking": 34,
        "tuition": "$62,000 / yil",
        "deadline": "2026-11-01",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Northwestern_University_Aerial.jpg/500px-Northwestern_University_Aerial.jpg",
        "city": "Evanston, Illinois",
        "overview": "Northwestern University AQShning Illinoys shtatida joylashgan va 1851-yilda tashkil etilgan. U jurnalistika, marketing, biznes va muhandislik sohalarida juda kuchli universitet hisoblanadi. Ayniqsa Kellogg School of Management dunyoning eng yaxshi biznes maktablaridan biri sifatida tanilgan. Universitet tibbiyot, sun’iy intellekt va ijtimoiy fanlar bo‘yicha ham kuchli tadqiqot markazlariga ega. Northwestern kampusi Michigan ko‘li bo‘yida joylashgan bo‘lib, akademik va estetik jihatdan juda qulay muhit yaratadi. Talabalar sanoat bilan yaqin ishlash va amaliy tajriba orttirish imkoniyatiga ega. Bitiruvchilar global media, biznes va texnologiya sohalarida yetakchi o‘rinlarni egallashadi.",
        "cost_of_living": "$18,000 - $22,000 / yil",
        "acceptance_rate": "7.0%",
        "website_link": "https://www.northwestern.edu",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1510",
        "gpa_expectation": "3.9 / 4.0"
    },
    {
        "id": 35,
        "name": "Université PSL (Paris Sciences & Lettres)",
        "country": "Fransiya",
        "major": "Philosophy, Physics & Mathematics",
        "ranking": 35,
        "tuition": "€243 - €377 / yil (Davlat subsidiya beradi)",
        "deadline": "2026-03-31",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8nit24liWp5od8diztWEptmZjtyiQWNPj1Q&s",
        "city": "Parij",
        "overview": "PSL University Fransiyaning Parij shahrida joylashgan bo‘lib, bir nechta elita institutlarning birlashmasidan tashkil topgan. U matematika, fizika, falsafa va iqtisodiyot sohalarida juda yuqori darajadagi akademik markaz hisoblanadi. PSL Yevropadagi eng selektiv va intellektual universitetlardan biri bo‘lib, kichik, ammo juda kuchli ilmiy hamjamiyatga ega. Uning professorlari orasida Nobel va Fields medali sovrindorlari mavjud. Universitet Parijning ilmiy va madaniy markazida joylashgani talabalar uchun katta resurs va imkoniyatlar yaratadi. PSL fundamental fanlar va innovatsiya o‘rtasidagi muvozanatni saqlashi bilan mashhur. Bu universitet akademik elitani tayyorlaydigan muhim markaz hisoblanadi.",
        "cost_of_living": "€12,000 - €16,000 / yil",
        "acceptance_rate": "11.0%",
        "website_link": "https://psl.eu",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 36,
        "name": "The University of Queensland",
        "country": "Avstraliya",
        "major": "Environmental Science & Ecology",
        "ranking": 36,
        "tuition": "$32,000 - $44,000 / yil",
        "deadline": "2026-11-30",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFEBVYHlTH4OsN3rIO5oSy5t3_eQ8JCyGwQ&s",
        "city": "Brisben",
        "overview": "University of Queensland Avstraliyaning Brisben shahrida joylashgan va 1909-yilda tashkil etilgan. U ekologiya, biologiya, tibbiyot va atrof-muhit fanlari bo‘yicha global yetakchi universitetlardan biridir. U ayniqsa vaksinologiya va biotexnologiya sohalarida muhim ilmiy kashfiyotlar bilan tanilgan. Universitet Avstraliyaning “Group of Eight” tadqiqot universitetlari alyansiga kiradi. Uning kampusi juda katta va zamonaviy laboratoriyalar bilan jihozlangan. Talabalar real ilmiy loyihalarda ishtirok etish imkoniga ega. Universitet barqaror rivojlanish va global ekologik muammolarni hal qilishga katta e’tibor beradi.",
        "cost_of_living": "$17,000 - $22,000 / yil",
        "acceptance_rate": "35.0%",
        "website_link": "https://www.uq.edu.au",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.6 / 4.0"
    },
    {
        "id": 37,
        "name": "Fudan University",
        "country": "Xitoy",
        "major": "International Economics & Politics",
        "ranking": 37,
        "tuition": "$4,000 - $7,000 / yil",
        "deadline": "2026-04-10",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS_Nt75hDH4eIcki-Tyf3YGq_8hI7XM2QG3A&s",
        "city": "Shanxay",
        "overview": "Fudan University Xitoyning Shanxay shahrida joylashgan va 1905-yilda tashkil etilgan. U liberal san’at, iqtisodiyot, siyosat va xalqaro munosabatlar sohalarida juda kuchli universitet hisoblanadi. Fudan Xitoyning eng intellektual va global yo‘naltirilgan universitetlaridan biri sifatida tanilgan. Uning dasturlari xalqaro talabalar uchun ingliz tilida ham taklif etiladi. Shanxayning global moliyaviy markaz bo‘lishi talabalar uchun katta amaliy imkoniyatlar yaratadi. Universitet tadqiqotlari diplomatiya, biznes va ijtimoiy fanlarga katta ta’sir ko‘rsatadi. Fudan bitiruvchilari ko‘pincha global kompaniyalar va davlat institutlarida yetakchi bo‘lishadi.",
        "cost_of_living": "$7,000 - $10,000 / yil",
        "acceptance_rate": "2.0%",
        "website_link": "https://www.fudan.edu.cn",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1420",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 38,
        "name": "King's College London (KCL)",
        "country": "Buyuk Britaniya",
        "major": "War Studies, Law & Nursing",
        "ranking": 38,
        "tuition": "£24,000 - £34,000 / yil",
        "deadline": "2026-01-28",
        "image": "https://www.kcl.ac.uk/ImportedImages/homepageimages/Carousel-Images/strand-quad.xfb6a93cb.jpg?w=1501&h=440&crop=780,440,361,0&f=webp",
        "city": "London, Angliya",
        "overview": "King’s College London Buyuk Britaniyaning eng nufuzli universitetlaridan biri bo‘lib, 1829-yilda tashkil etilgan. U London markazida joylashgan va tibbiyot, huquq, xalqaro munosabatlar hamda gumanitar fanlar sohalarida juda kuchli. KCL ayniqsa “War Studies” yo‘nalishi bilan dunyoda eng mashhur universitetlardan biridir. Universitet NHS bilan yaqin hamkorlikda ishlaydi va tibbiy tadqiqotlarda muhim rol o‘ynaydi. Uning kampusi Londonning tarixiy va zamonaviy hududlarini qamrab oladi. Talabalar global siyosat, diplomatiya va biznes markazida o‘qish imkoniga ega bo‘lishadi. KCL xalqaro akademik tarmoqda juda kuchli o‘rin egallaydi.",
        "cost_of_living": "£15,000 - £20,000 / yil",
        "acceptance_rate": "13.0%",
        "website_link": "https://www.kcl.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "1440",
        "gpa_expectation": "3.75 / 4.0"
    },
    {
        "id": 39,
        "name": "The Chinese University of Hong Kong (CUHK)",
        "country": "Gongkong",
        "major": "Translation, Chinese Studies & CS",
        "ranking": 39,
        "tuition": "$18,500 - $22,000 / yil",
        "deadline": "2026-01-31",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgf9iKZ6lr52NqlbL4UDbYbOJjsMC5huPg-g&s",
        "city": "Gongkong",
        "overview": "CUHK Gonkongda joylashgan yirik tadqiqot universiteti bo‘lib, 1963-yilda tashkil etilgan. U kollejlarga asoslangan tizimga ega bo‘lib, Osiyodagi eng kuchli akademik institutlardan biridir. CUHK tilshunoslik, kompyuter fanlari, tibbiyot va biznes sohalarida juda kuchli. Universitet Sharq va G‘arb ta’lim tizimlarini uyg‘unlashtirgan noyob modelga ega. Uning kampusi tog‘li hududda joylashgan bo‘lib, juda keng va zamonaviy infratuzilmaga ega. CUHK ilmiy tadqiqotlari xalqaro darajada tan olingan. Bitiruvchilari global kompaniyalar va akademik institutlarda yuqori lavozimlarga ega.",
        "cost_of_living": "$10,000 - $13,000 / yil",
        "acceptance_rate": "15.0%",
        "website_link": "https://www.cuhk.edu.hk",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1420",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 40,
        "name": "Korea Advanced Institute of Science and Technology (KAIST)",
        "country": "Janubiy Koreya",
        "major": "Robotics, Semiconductor & CS",
        "ranking": 40,
        "tuition": "$6,000 - $8,000 / yil",
        "deadline": "2026-02-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7o1fzqZz8zxsRRInmm_oIQso0J0rg_n_J9Q&s",
        "city": "Tejon (Daejeon)",
        "overview": "KAIST Janubiy Koreyaning Daejeon shahrida joylashgan va mamlakatning eng kuchli ilmiy-texnologik universitetidir. 1971-yilda tashkil etilgan bo‘lib, ko‘pincha “Koreyaning MIT’i” deb ataladi. KAIST robototexnika, sun’iy intellekt, yarimo‘tkazgichlar va kompyuter fanlari bo‘yicha global yetakchi hisoblanadi. Universitet Samsung, LG va Hyundai kabi yirik kompaniyalar bilan yaqin ilmiy hamkorlik qiladi. Uning tadqiqotlari Koreyaning texnologik rivojlanish strategiyasida markaziy rol o‘ynaydi. Kampus juda innovatsion bo‘lib, startap va ilmiy tadqiqot madaniyatiga asoslangan. KAIST bitiruvchilari global texnologiya sanoatida yuqori talabga ega.",
        "cost_of_living": "$8,000 - $11,000 / yil",
        "acceptance_rate": "15.0%",
        "website_link": "https://www.kaist.ac.kr",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1460",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 41,
        "name": "The University of Edinburgh",
        "country": "Buyuk Britaniya",
        "major": "Informatics, Philosophy & History",
        "ranking": 41,
        "tuition": "£23,000 - £33,000 / yil",
        "deadline": "2026-01-28",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuV4boYHXox45mXUZ4zuoreBhdcrxdpCwP-w&s",
        "city": "Edinburg, Shotlandiya",
        "overview": "University of Edinburgh Shotlandiyaning poytaxti Edinburg shahrida joylashgan va 1583-yilda tashkil etilgan. U Buyuk Britaniyadagi eng qadimiy va ilmiy jihatdan eng nufuzli universitetlardan biri hisoblanadi. Universitet ayniqsa informatika, sun’iy intellekt, falsafa, tilshunoslik va tarix sohalarida juda kuchli ilmiy maktabga ega. Edinburgh AI tadqiqotlari bo‘yicha Yevropaning eng muhim markazlaridan biri bo‘lib, zamonaviy mashina o‘rganish va tabiiy tilni qayta ishlash yo‘nalishlarida katta rol o‘ynaydi. Uning kampusi tarixiy arxitektura va zamonaviy laboratoriyalar uyg‘unlashgan muhitda joylashgan. Universitet global ilmiy hamkorlik tarmoqlariga ega bo‘lib, juda ko‘p xalqaro talabalarni jalb qiladi. Bitiruvchilari akademiya, texnologiya va davlat boshqaruvi sohalarida yetakchi o‘rinlarda ishlaydi.",
        "cost_of_living": "£12,000 - £15,000 / yil",
        "acceptance_rate": "12.3%",
        "website_link": "https://www.ed.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "1450",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 42,
        "name": "The Hong Kong Polytechnic University",
        "country": "Gongkong",
        "major": "Design, Hospitality & Engineering",
        "ranking": 42,
        "tuition": "$18,000 - $21,000 / yil",
        "deadline": "2026-02-28",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1KCoSl0bPhKS0jnXsvyfw_xUF-gErp1vu4Q&s",
        "city": "Gongkong",
        "overview": "Hong Kong Polytechnic University Gonkongda joylashgan yirik davlat tadqiqot universiteti bo‘lib, 1937-yilda tashkil etilgan. U amaliy fanlar va muhandislik yo‘nalishlariga kuchli yo‘naltirilgan universitet sifatida tanilgan. Ayniqsa dizayn, arxitektura, mehmondo‘stlik boshqaruvi, logistika va muhandislik sohalarida global darajada yuqori o‘ringa ega. PolyU sanoat bilan juda yaqin ishlaydi va talabalariga real loyiha asosida ta’lim beradi. Uning tadqiqotlari aerokosmik texnologiyalar, smart shahar tizimlari va robototexnika yo‘nalishlarida kuchli. Kampus zamonaviy va texnologik jihatdan ilg‘or infratuzilmaga ega. Bitiruvchilari global kompaniyalarda amaliy va boshqaruv lavozimlarida ishlashadi.",
        "cost_of_living": "$10,000 - $14,000 / yil",
        "acceptance_rate": "20.0%",
        "website_link": "https://www.polyu.edu.hk",
        "scholarship_available": true,
        "IELTS_requirement": "6.0",
        "SAT_requirement": "1380",
        "gpa_expectation": "3.5 / 4.0"
    },
    {
        "id": 43,
        "name": "Paris-Saclay University",
        "country": "Fransiya",
        "major": "Mathematics & Physics",
        "ranking": 43,
        "tuition": "€243 - €377 / yil",
        "deadline": "2026-04-30",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyU86mLQ1XsfSl5Qg5dlxeFvs_g0xGa5bEEg&s",
        "city": "Parij",
        "overview": "Paris-Saclay University Fransiyaning ilmiy klaster markazida joylashgan va Yevropadagi eng kuchli STEM universitetlaridan biri hisoblanadi. U matematika, fizika, kimyo va muhandislik fanlarida dunyo miqyosida juda yuqori reytingga ega. Universitet bir nechta ilmiy institutlar va grandes écoles birlashmasidan tashkil topgan. Ayniqsa matematika sohasida u dunyoning eng kuchli markazlaridan biri bo‘lib, Fields medali egalari bilan bog‘liq kuchli ilmiy an’analarga ega. Paris-Saclay ilmiy innovatsiya va sanoat tadqiqotlarini birlashtirgan kuchli ekotizimga ega. Uning kampusi Parij yaqinidagi yuqori texnologik ilmiy zonada joylashgan. Talabalar fundamental va amaliy tadqiqotlar o‘rtasida juda kuchli balansda ta’lim olishadi.",
        "cost_of_living": "€10,000 - €14,000 / yil",
        "acceptance_rate": "15.0%",
        "website_link": "https://www.universite-paris-saclay.fr",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 44,
        "name": "Technical University of Munich (TUM)",
        "country": "Germaniya",
        "major": "Automotive Engineering & CS",
        "ranking": 44,
        "tuition": "€4,000 - €6,000 / yil (Xalqaro talabalar uchun yangi to'lovlar)",
        "deadline": "2026-05-31",
        "image": "https://study-eu.s3.eu-west-1.amazonaws.com/uploads/image/path/71/wide_fullhd_technical-university-of-munich-garching-1.jpg",
        "city": "Myunxen",
        "overview": "Technical University of Munich Germaniyaning eng kuchli texnik universitetlaridan biri bo‘lib, Myunxen shahrida joylashgan. U muhandislik, kompyuter fanlari, avtomobilsozlik va tabiiy fanlar bo‘yicha Yevropaning yetakchi markazlaridan hisoblanadi. TUM BMW, Siemens va Airbus kabi yirik sanoat kompaniyalari bilan bevosita ilmiy hamkorlik qiladi. Universitet innovatsiya va amaliy tadqiqotlarga juda kuchli yo‘naltirilgan. Uning kampusi zamonaviy laboratoriyalar va startap inkubatorlari bilan jihozlangan. TUM Germaniyaning texnologik rivojlanishida muhim rol o‘ynaydi. Bitiruvchilari Yevropa va global sanoatda yuqori talabga ega mutaxassislar hisoblanadi.",
        "cost_of_living": "€12,000 - €15,000 / yil",
        "acceptance_rate": "28.0%",
        "website_link": "https://www.tum.de",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 45,
        "name": "University of New South Wales (UNSW)",
        "country": "Avstraliya",
        "major": "Solar Energy & Engineering",
        "ranking": 45,
        "tuition": "$35,000 - $47,000 / yil",
        "deadline": "2026-10-31",
        "image": "https://www.unsw.edu.au/content/unsw-sites/au/en/study/discover/campus/_jcr_content/root/responsivegrid-layout-fixed-width/responsivegrid-full-top/column_layout/par_1/column_layout_copy/par_1/column_layout_579515_1357325856/par_2_1_50/image.coreimg.82.1170.jpeg/1757678963997/2021-11-eng-news-13.jpeg",
        "city": "Sidney",
        "overview": "UNSW Avstraliyaning Sidney shahrida joylashgan va “Group of Eight” tadqiqot universitetlaridan biridir. U muhandislik, biznes, huquq va sun’iy intellekt sohalarida kuchli akademik obro‘ga ega. UNSW ayniqsa qayta tiklanadigan energiya, quyosh texnologiyalari va barqaror muhandislik bo‘yicha global yetakchi hisoblanadi. Universitet sanoat bilan juda kuchli hamkorlik qiladi va talabalariga real loyihalarda ishlash imkonini beradi. Uning kampusi zamonaviy va texnologik innovatsiyalarga yo‘naltirilgan. UNSW Avstraliya startap ekotizimida ham muhim rol o‘ynaydi. Bitiruvchilari global texnologiya va biznes kompaniyalarida yuqori lavozimlarga chiqadi.",
        "cost_of_living": "$19,000 - $24,000 / yil",
        "acceptance_rate": "26.0%",
        "website_link": "https://www.unsw.edu.au",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.6 / 4.0"
    },
    {
        "id": 46,
        "name": "The University of British Columbia (UBC)",
        "country": "Kanada",
        "major": "Geography, Forestry & CS",
        "ranking": 46,
        "tuition": "$42,000 - $56,000 / yil",
        "deadline": "2026-01-15",
        "image": "https://gecliving.com/wp-content/uploads/2022/11/irving-k-barber-learning-1024x576.webp",
        "city": "Vankuver",
        "overview": "UBC Kanadaning Vankuver shahrida joylashgan va 1908-yilda tashkil etilgan. U Shimoliy Amerikadagi eng kuchli tadqiqot universitetlaridan biri hisoblanadi. Ayniqsa kompyuter fanlari, ekologiya, o‘rmon xo‘jaligi va barqaror rivojlanish sohalarida juda kuchli. UBC dunyodagi eng chiroyli kampuslardan biriga ega bo‘lib, okean va o‘rmon bilan o‘ralgan. Universitet iqlim o‘zgarishi va ekologik tadqiqotlar bo‘yicha global yetakchi markazlardan biridir. UBC xalqaro talabalar uchun juda kuchli ilmiy va amaliy imkoniyatlar yaratadi. Bitiruvchilari akademiya, texnologiya va ekologiya sohalarida yetakchi o‘rinlarda ishlashadi.",
        "cost_of_living": "$14,000 - $18,000 / yil",
        "acceptance_rate": "45.0%",
        "website_link": "https://www.ubc.ca",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1420",
        "gpa_expectation": "3.75 / 4.0"
    },
    {
        "id": 47,
        "name": "Zhejiang University",
        "country": "Xitoy",
        "major": "Industrial Automation & Engineering",
        "ranking": 47,
        "tuition": "$3,800 - $6,500 / yil",
        "deadline": "2026-03-01",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8B25BzCczdDimzIEwXE-5cvaN0HWcXKkT0A&s",
        "city": "Xanchjou",
        "overview": "Zhejiang University Xitoyning Xanchjou shahrida joylashgan va mamlakatning eng kuchli tadqiqot universitetlaridan biridir. U muhandislik, avtomatlashtirish, kompyuter fanlari va qishloq xo‘jaligi texnologiyalari bo‘yicha juda kuchli ilmiy bazaga ega. Universitet sanoat innovatsiyalari va patentlar bo‘yicha Xitoyning eng faol markazlaridan biri hisoblanadi. Zhejiang University Alibaba kabi texnologik gigantlar joylashgan hududda bo‘lib, kuchli sanoat integratsiyasiga ega. Uning kampusi juda katta va zamonaviy ilmiy laboratoriyalar bilan jihozlangan. Universitet Xitoyning texnologik modernizatsiyasida muhim rol o‘ynaydi. Bitiruvchilari global IT va muhandislik sanoatida talab yuqori mutaxassislar hisoblanadi.",
        "cost_of_living": "$6,500 - $9,500 / yil",
        "acceptance_rate": "3.0%",
        "website_link": "https://www.zju.edu.cn",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1400",
        "gpa_expectation": "3.75 / 4.0"
    },
    {
        "id": 48,
        "name": "Shanghai Jiao Tong University",
        "country": "Xitoy",
        "major": "Marine Engineering & CS",
        "ranking": 48,
        "tuition": "$4,200 - $7,000 / yil",
        "deadline": "2026-04-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSRMi51-7REdhihzdPFJmgiI_UzCm3zUivQA&s",
        "city": "Shanxay",
        "overview": "Shanghai Jiao Tong University Xitoyning Shanxay shahrida joylashgan va 1896-yilda tashkil etilgan. U muhandislik, dengiz texnologiyalari, kompyuter fanlari va iqtisodiyot sohalarida juda kuchli universitetdir. SJTU Xitoyning eng eski va eng nufuzli texnik universitetlaridan biri hisoblanadi. Uning tadqiqotlari kemasozlik, energetika va sun’iy intellekt sohalariga katta ta’sir ko‘rsatadi. Universitet sanoat bilan juda yaqin hamkorlik qiladi va yirik texnologik kompaniyalar bilan integratsiyalashgan. Kampus zamonaviy va ilmiy innovatsiyalarga yo‘naltirilgan. Bitiruvchilari global muhandislik va texnologiya sanoatida yuqori lavozimlarga ega.",
        "cost_of_living": "$7,000 - $10,500 / yil",
        "acceptance_rate": "2.5%",
        "website_link": "https://en.sjtu.edu.cn",
        "scholarship_available": true,
        "IELTS_requirement": "6.5",
        "SAT_requirement": "1430",
        "gpa_expectation": "3.8 / 4.0"
    },
    {
        "id": 49,
        "name": "Delft University of Technology",
        "country": "Niderlandiya",
        "major": "Civil Engineering & Aerospace",
        "ranking": 49,
        "tuition": "€16,000 - €21,000 / yil",
        "deadline": "2026-01-15",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTYdmJZyEwKJZO3G8R-WWq1SmKZLmJwkjjtw&s",
        "city": "Delft",
        "overview": "TU Delft Niderlandiyaning Delft shahrida joylashgan va 1842-yilda tashkil etilgan. U Yevropadagi eng kuchli muhandislik va texnologiya universitetlaridan biri hisoblanadi. Ayniqsa fuqarolik muhandisligi, aerokosmik texnologiyalar va arxitektura sohalarida global yetakchi. TU Delft Gollandiya suv boshqaruvi tizimlarining ilmiy asosini shakllantirgan muhim markaz hisoblanadi. Universitet sanoat bilan kuchli integratsiyalashgan bo‘lib, Airbus va boshqa yirik kompaniyalar bilan hamkorlik qiladi. Uning kampusi innovatsion laboratoriyalar va dizayn markazlariga ega. Bitiruvchilari Yevropa va global muhandislik sanoatida juda yuqori talabga ega.",
        "cost_of_living": "€11,000 - €15,000 / yil",
        "acceptance_rate": "32.0%",
        "website_link": "https://www.tudelft.nl",
        "scholarship_available": true,
        "IELTS_requirement": "7.0",
        "SAT_requirement": "N/A",
        "gpa_expectation": "3.7 / 4.0"
    },
    {
        "id": 50,
        "name": "London School of Economics and Political Science (LSE)",
        "country": "Buyuk Britaniya",
        "major": "Economics, Politics & Data Science",
        "ranking": 50,
        "tuition": "£25,500 - £30,000 / yil",
        "deadline": "2026-01-28",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3mBIgKLYODkjEfMFWePAoyGmDqxIwQp7P2Q&s",
        "city": "London, Angliya",
        "overview": "LSE Buyuk Britaniyaning London shahrida joylashgan va 1895-yilda tashkil etilgan. U iqtisodiyot, siyosat, sotsiologiya va ma’lumotlar tahlili sohalarida dunyoning eng kuchli universitetlaridan biri hisoblanadi. LSE global moliyaviy va siyosiy elita tayyorlaydigan markaz sifatida mashhur. Uning bitiruvchilari orasida ko‘plab davlat rahbarlari, iqtisodchilar va Nobel mukofoti sovrindorlari bor. Universitet London markazida joylashgani sababli talabalar xalqaro institutlar va banklarga bevosita yaqin bo‘ladi. LSE ilmiy tadqiqotlari global iqtisodiy siyosat va ijtimoiy tizimlarga katta ta’sir ko‘rsatadi. Bu universitet dunyodagi eng nufuzli ijtimoiy fanlar markazi hisoblanadi.",
        "cost_of_living": "£16,000 - £22,000 / yil",
        "acceptance_rate": "8.9%",
        "website_link": "https://www.lse.ac.uk",
        "scholarship_available": true,
        "IELTS_requirement": "7.5",
        "SAT_requirement": "1480",
        "gpa_expectation": "3.85 / 4.0"
    }
];

const scholarshipsData = [
  {
    id: 1,
    name: '„El-yurt umidi“ jamgʻarmasi stipendiyasi (EYUF)',
    country: 'O‘zbekiston',
    type: 'To‘liq',
    provider: 'O‘zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi „El-yurt umidi“ jamg‘armasi',
    overview: 'O‘zbekiston Respublikasi yoshlariga jahonning eng nufuzli xorijiy universitetlarida bakalavriat, magistratura va doktorantura dasturlari bo‘yicha ta‘lim olishlari uchun ajratiladigan davlat to‘liq grant dasturi.',
    eligibility: 'O‘zbekiston Respublikasi fuqarolari. Yosh chegarasi: Bakalavriat uchun odatda 25 yoshgacha, Magistratura va PhD uchun mos ravishda yosh cheklovlari (nomzod toifasiga qarab). Nomzod dunyoning top universitetlaridan (Times Higher Education, QS, ARWU reytingidagi TOP-100/300-500) mustaqil ravishda taklifnoma (Offer letter) olgan bo‘lishi lozim.',
    coverage: '100% O‘qish to‘lovi, yashash xarajatlari (turar joy va oziq-ovqat), xalqaro aviachiptalar, tibbiy sug‘urta, viza xarajatlari va darsliklar sotib olish nafaqasi.',
    deadline: '2026-04-24',
    requirements: 'Xorijiy universitetdan shartsiz taklifnoma (Unconditional Offer), xalqaro til sertifikati (IELTS 6.5+ / TOEFL iBT 79+), pasport/ID karta, diplom va transkript (yoki attestat), mehnat daftarchasi (agar mavjud bo‘lsa).',
    application_process: '1. Jamg‘armaning maxsus portali orqali onlayn ro‘yxatdan o‘tish va hujjat topshirish. 2. Saralash bosqichlari (hujjatlar ekspertizasi va suhbat). 3. Jamg‘arma Vasiylik kengashi tomonidan g‘oliblar ro‘yxatini tasdiqlash.',
    official_website: 'https://eyuf.uz',
    image: 'https://cdn.brandfetch.io/domain/eyuf.uz/fallback/lettermark/theme/dark/h/400/w/400/icon?c=1bfwsmEH20zzEfSNTed',
    IELTS_requirement: '7.0',
    SAT_requirement: 'Tavsiya etiladi (Top universitetlar talabiga qarab)',
    degree_level: 'Bakalavr, Magistr, PhD',
    monthly_stipend: 'Mamlakat va universitet joylashuviga qarab o‘zgaradi (Oylik yashash xarajatlari to‘liq qoplanadi)'
  },
  {
    id: 2,
    name: 'Fulbright Foreign Student Program',
    country: 'AQSh',
    type: 'To‘liq',
    provider: 'AQSh Davlat Departamenti',
    overview: 'Fulbright dasturi dunyo bo‘ylab iqtidorli yoshlar va mutaxassislarga AQSh universitetlarida magistrlik va doktorlik darajalarini olish uchun mo‘ljallangan eng nufuzli almashinuv grantidir.',
    eligibility: 'Bakalavr darajasiga ega bo‘lish, ingliz tilini mukammal bilish, O‘zbekiston fuqarosi bo‘lish (va ariza topshirayotgan mamlakatda yashash).',
    coverage: 'To‘liq o‘quv shartnomasi, oylik yashash stipendiyasi, tibbiy sug‘urta, aviachipta va akademik kitoblar xarajati.',
    deadline: '2026-06-15',
    requirements: 'Bakalavr diplomi, 3 ta tavsiyanoma, TOEFL iBT 80+ yoki IELTS 7.0+, GRE / GMAT (ba‘zi yo‘nalishlar uchun), insholar (Personal Statement & Study Objective).',
    application_process: '1. Onlayn ariza to‘ldirish. 2. Dastlabki texnik tekshiruv. 3. Toshkentdagi AQSh elchixonasida shaxsiy intervyu bosqichi. 4. Yakuniy tasdiq va AQShga yo‘llanma.',
    official_website: 'https://foreign.fulbrightonline.org/about/foreign-student-program',
    image: 'https://fledu.uz/wp-content/uploads/2023/05/make-lasting-connections.jpg',
    IELTS_requirement: '7.0',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '$1,500 - $2,500 (shtatga qarab)'
  },
  {
    id: 3,
    name: 'DAAD Scholarships',
    country: 'Germaniya',
    type: 'To‘liq',
    provider: 'Germaniya Akademik Almashinuv Xizmati (DAAD)',
    overview: 'Germaniyaning eng yirik davlat granti bo‘lib, xalqaro talabalarga nemis va ingliz tillaridagi magistratura va PhD dasturlarida bepul o‘qish va ilmiy tadqiqotlar olib borish imkonini beradi.',
    eligibility: 'Bakalavr darajasini so‘nggi 6 yil ichida tamomlagan bo‘lish, kamida 2 yillik professional ish tajribasiga ega bo‘lish (EPOS yo‘nalishlari uchun).',
    coverage: 'Oylik stipendiya (€934 - €1,200), tibbiy sug‘urta, safar xarajatlari, nemis tili kursi xarajatlari va universitet to‘lovlaridan ozod etish.',
    deadline: '2026-10-15',
    requirements: 'CV (Europass formatida), motivatsiya xati, ish joyidan tavsiyanoma, IELTS 6.5+ yoki TestDaF (nemisi tili uchun), bakalavr diplomi.',
    application_process: '1. DAAD portalida ro‘yxatdan o‘tish va arizani yuklash. 2. DAAD qo‘mitasining akademik tahlili. 3. Suhbat yoki yakuniy javoblarning e‘lon qilinishi.',
    official_website: 'https://www.daad.de',
    image: 'https://www.aaup.edu/sites/default/files/styles/large_850_570/public/2023-08/daad-scholarships.jpg?h=09bc12e8&itok=NKnMFMVh',
    IELTS_requirement: '6.5',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '€934 - €1,200'
  },
  {
    id: 4,
    name: 'Chevening Scholarship',
    country: 'Buyuk Britaniya',
    type: 'To‘liq',
    provider: 'Buyuk Britaniya Tashqi Ishlar Vazirligi (FCDO)',
    overview: 'Kelajakdagi yetakchilar uchun mo‘ljallangan nufuzli xalqaro grant. Buyuk Britaniyaning istalgan universitetida bir yillik magistrlik darajasini olishni to‘liq moliyalashtiradi.',
    eligibility: 'Bakalavr diplomi, kamida 2 yillik (2800 soat) ish tajribasi, o‘qish tugagach o‘z vataniga qaytish va kamida 2 yil xizmat qilish majburiyati.',
    coverage: '100% Universitet o‘qish to‘lovi (tuition), oylik yashash nafaqasi, Buyuk Britaniyaga borish va qaytish aviachiptalari, viza to‘lovi va maxsus tadbirlar uchun qo‘shimcha mablag‘lar.',
    deadline: '2026-11-01',
    requirements: 'To‘rtta insho (Leadership, Networking, Studying in the UK, Career Plan), 2 ta akademik/kasbiy tavsiyanoma, 3 ta universitet tanlovi.',
    application_process: '1. Onlayn Chevening portalida ariza topshirish. 2. Insholar tahlili va intervyuga chaqirilish. 3. Elchixonadagi yuzma-yuz suhbat bosqichi. 4. Britaniya oliygohidan so‘zsiz (unconditional offer) taklifnoma olish.',
    official_website: 'https://www.chevening.org',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOV8ndZvcekq9u9u_VUDc6J1H6DuBy4b-DjA&s',
    IELTS_requirement: '6.5',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura',
    monthly_stipend: '£1,100 - £1,400'
  },
  {
    id: 5,
    name: 'MEXT Scholarship',
    country: 'Yaponiya',
    type: 'To‘liq',
    provider: 'Yaponiya Ta‘lim, Madaniyat, Sport, Fan va Texnologiyalar Vazirligi',
    overview: 'Yaponiya hukumati granti dunyodagi eng raqobatbardosh dasturlardan biri bo‘lib, Yaponiyada bakalavr, magistr va PhD darajalarida mukammal ta‘lim olish imkonini beradi.',
    eligibility: 'Bakalavriat uchun 17-25 yosh oralig‘ida bo‘lish, magistratura uchun 35 yoshdan oshmagan bo‘lish, yuqori akademik ko‘rsatkichlar.',
    coverage: 'To‘liq o‘quv shartnomasi, oylik stipendiya (117,000 JPY - 145,000 JPY), aviachipta va viza xarajatlari, yapon tili tayyorlov kurslari.',
    deadline: '2026-05-30',
    requirements: 'Baholar varaqasi, tavsiyanoma, yapon yoki ingliz tilini bilish sertifikati, elchixona tomonidan o‘tkaziladigan yozma imtihonlar (Matematika, Ingliz tili/Yapon tili).',
    application_process: '1. Toshkentdagi Yaponiya elchixonasiga hujjat topshirish. 2. Yozma imtihonlar va intervyu bosqichi. 3. MEXT vazirligi tomonidan yakuniy tasdiqlash.',
    official_website: 'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpbDLpv7SL_nbW8fUmZLy1q69Ddp5lZ6jYw&s',
    IELTS_requirement: '6.5',
    SAT_requirement: 'N/A',
    degree_level: 'Bakalavr, Magistr, PhD',
    monthly_stipend: '117,000 - 145,000 JPY'
  },
  {
    id: 6,
    name: 'Stipendium Hungaricum',
    country: 'Vengriya',
    type: 'To‘liq',
    provider: 'Vengriya Hukumati / Tempus Public Foundation',
    overview: 'Vengriyaning eng yirik xalqaro ta‘lim dasturi bo‘lib, dunyoning turli mamlakatlaridan kelgan talabalarga Vengriyaning nufuzli universitetlarida bepul o‘qish imkonini taqdim etadi.',
    eligibility: 'Bakalavriat, magistratura va doktorantura talabgorlari, ariza topshirish vaqtida 18 yoshga to‘lgan bo‘lish.',
    coverage: 'Bepul o‘qish to‘lovi, oylik stipendiya (43,700 HUF bakalavr/magistr, 140,000 HUF PhD), bepul yotoqxona yoki uy-joy kompensatsiyasi (40,000 HUF), tibbiy sug‘urta.',
    deadline: '2026-01-15',
    requirements: 'Motivatsiya xati, tibbiy ma‘lumotnoma (OIV, gepatit yo‘qligi haqida), ingliz tili sertifikati (IELTS 6.0+), baholar transkripti.',
    application_process: '1. Stipendium Hungaricum onlayn tizimi orqali ariza topshirish. 2. O‘zbekiston Oliy ta‘lim vazirligi (nomzodlarni tavsiya etuvchi hamkor) tomonidan saralash. 3. Vengriya universitetlarining ichki imtihonlari.',
    official_website: 'https://stipendiumhungaricum.hu',
    image: 'https://www.scholarshipregion.com/wp-content/uploads/2023/11/Stipendium-Hungarian-Scholarships.jpg',
    IELTS_requirement: '6.0',
    SAT_requirement: 'N/A',
    degree_level: 'Bakalavr, Magistr, PhD',
    monthly_stipend: '43,700 - 140,000 HUF'
  },
  {
    id: 7,
    name: 'Turkiye Burslari',
    country: 'Turkiya',
    type: 'To‘liq',
    provider: 'Turkiya Respublikasi Hukumati / YTB',
    overview: 'Dunyo bo‘ylab millionlab arizalar qabul qiladigan Turkiya hukumati dasturi oliy ma‘lumot olish va turk madaniyatini o‘rganishni istagan talabalarga to‘liq imkoniyat yaratadi.',
    eligibility: 'Yosh chegarasi: Bakalavriat uchun 21, Magistratura uchun 30, Doktorantura uchun 35 yosh. Akademik muvaffaqiyat: Bakalavr uchun kamida 70%, Tibbiyot uchun 90%.',
    coverage: 'Universitet o‘qish to‘lovi, oylik stipendiya (bakalavr: 1000 TL, magistr: 1400 TL, PhD: 1800 TL), bepul turar joy (yotoqxona), 1 yillik turk tili kursi, bir martalik aviachiptalar, tibbiy sug‘urta.',
    deadline: '2026-02-20',
    requirements: 'Maktab/universitet baholari, insholar, tavsiyanoma, milliy yoki xalqaro imtihon sertifikatlari (agar mavjud bo‘lsa), rasm va pasport nusxasi.',
    application_process: '1. Turkiye Burslari rasmiy portalida ariza va hujjatlarni to‘ldirish. 2. Dastlabki baholash. 3. Elchixona yoki belgilangan markazlarda shaxsiy suhbat. 4. Yakuniy natijalar.',
    official_website: 'https://www.turkiyeburslari.gov.tr',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdL49gmBhflX6UllnuUDfMB2PGa6KDQlpZXQ&s',
    IELTS_requirement: '6.0 (agar ingliz tilida o‘qisa)',
    SAT_requirement: '1200 (tavsiya etiladi)',
    degree_level: 'Bakalavr, Magistr, PhD',
    monthly_stipend: '1,000 - 1,800 TRY'
  },
  {
    id: 8,
    name: 'Erasmus+ Joint Master Degrees',
    country: 'Yevropa',
    type: 'To‘liq',
    provider: 'Yevropa Ittifoqi Komissiyasi',
    overview: 'Erasmus Mundus qo‘shma magistrlik dasturi talabalarga kamida ikki yoki uchta Yevropa mamlakatlaridagi turli universitetlarda o‘qish va bir nechta diplom olish imkonini beruvchi nufuzli dasturdir.',
    eligibility: 'Bakalavr darajasiga ega bo‘lish, yuqori darajadagi akademik tayyorgarlik va ingliz tilini mukammal egallaganlik (IELTS 6.5+).',
    coverage: 'To‘liq kontrakt to‘lovlari, oylik 1000 yevro miqdorida stipendiya (yashash va ovqatlanish xarajatlari uchun), safar va aviachipta xarajatlari, sug‘urta.',
    deadline: '2026-02-15',
    requirements: 'Bakalavr diplomi, CV, 2 ta akademik tavsiyanoma, motivatsiya xati, IELTS/TOEFL sertifikati.',
    application_process: '1. Erasmus Mundus katalogidan mos keladigan yo‘nalishni tanlash. 2. Tanlangan konsorsium saytida to‘g‘ridan-to‘g‘ri ariza topshirish. 3. Universitetlar qo‘mitasi tomonidan saralanish va intervyu.',
    official_website: 'https://ec.europa.eu/programmes/erasmus-plus/opportunities/individuals/students/erasmus-mundus-joint-master-degrees_en',
    image: 'https://erasmus.uz/storage/pages/January2025/Fm8NoAOnXQljvnoNsIQx.jpeg',
    IELTS_requirement: '6.5',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura',
    monthly_stipend: '€1,000'
  },
  {
    id: 9,
    name: 'Commonwealth Scholarships',
    country: 'Buyuk Britaniya',
    type: 'To‘liq',
    provider: 'Hamdo‘stlik Grantlari Komissiyasi (CSC)',
    overview: 'Rivojlanayotgan mamlakatlardan kelgan va o‘z yurtida ijobiy ijtimoiy-iqtisodiy o‘zgarishlar qila oladigan iqtidorli talabalar uchun Buyuk Britaniya oliygohlarida magistratura va PhD darajasini olish imkoniyati.',
    eligibility: 'Belgilangan Hamdo‘stlikka a‘zo davlatlar yoki muayyan hamkor davlatlar fuqarosi bo‘lish (va unda yashash), bakalavr darajasiga ega bo‘lish.',
    coverage: 'To‘liq o‘quv shartnomasi, oylik stipendiya (£1,300 - £1,600), aviachiptalar, viza to‘lovlari, turar joy nafaqasi.',
    deadline: '2026-10-15',
    requirements: 'Akademik natijalar, 3 ta tavsiyanoma, batafsil rivojlanish rejasi (Development Impact), IELTS 6.5+.',
    application_process: '1. Milliy nomzod ko‘rsatuvchi tashkilot (National Nominating Agency) orqali yoki to‘g‘ridan-to‘g‘ri topshirish. 2. CSC komissiyasi tomonidan ko‘rib chiqish. 3. Yakuniy tasdiq.',
    official_website: 'https://cscuk.fcdo.gov.uk',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVNHkkk2rZ3tfA6jr4wMP5Re5TL9deqMd0g&s',
    IELTS_requirement: '6.5',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '£1,300 - £1,600'
  },
  {
    id: 10,
    name: 'Chinese Government Scholarship (CSC)',
    country: 'Xitoy',
    type: 'To‘liq',
    provider: 'Xitoy Xalq Respublikasi Ta‘lim Vazirligi / CSC',
    overview: 'Xitoy hukumati tomonidan xalqaro talabalarga Xitoyning eng yaxshi 280 dan ortiq universitetlarida xitoy yoki ingliz tillarida oliy ma‘lumot olish uchun ajratiladigan to‘liq grant.',
    eligibility: 'Sog‘lom xalqaro talaba bo‘lish, bakalavriat uchun 25 yoshgacha, magistratura uchun 35 yoshgacha bo‘lish, yuqori GPA.',
    coverage: 'To‘liq o‘quv to‘lovi, bepul universitet yotoqxonasi, oylik stipendiya (3,000 RMB bakalavr, 3,500 RMB magistr), tibbiy sug‘urta.',
    deadline: '2026-03-31',
    requirements: 'Notarial tasdiqlangan diplom va transkript, o‘quv rejasi yoki tadqiqot rejasi, 2 ta professor tavsiyanomasi, IELTS 6.0+ yoki HSK sertifikati (xitoy tili uchun).',
    application_process: '1. CSC onlayn portalida ro‘yxatdan o‘tish (Type A yoki Type B). 2. Universitetga hujjatlarni yuborish. 3. Akademik suhbat va qabul maktubini olish.',
    official_website: 'https://www.campuschina.org',
    image: 'https://www.opportunitiesforafricans.com/wp-content/uploads/2017/04/china-scholarship-council.jpg',
    IELTS_requirement: '6.0',
    SAT_requirement: 'N/A',
    degree_level: 'Bakalavr, Magistr, PhD',
    monthly_stipend: '3,000 - 3,500 RMB'
  },
  {
    id: 11,
    name: 'Gates Cambridge Scholarship',
    country: 'Buyuk Britaniya',
    type: 'To‘liq',
    provider: 'Bill & Melinda Gates Jamg‘armasi',
    overview: 'Kembrij universitetida magistr yoki PhD darajasida o‘qishni istagan, dunyodagi eng iqtidorli va yetakchilik qobiliyatiga ega bo‘lgan xalqaro talabalarga beriladigan juda raqobatbardosh to‘liq grant.',
    eligibility: 'Buyuk Britaniyadan tashqaridagi barcha mamlakatlar fuqarolari, Kembrij universitetida taklif etiladigan to‘liq vaqtli magistr/PhD dasturlaridan biriga qabul qilinish.',
    coverage: 'To‘liq universitet kontrakt to‘lovi, yillik yashash stipendiyasi (£18,744), aviachiptalar, viza va tibbiy sug‘urta xarajatlari, oilaviy nafaqa (agar farzandi bo‘lsa).',
    deadline: '2026-12-05',
    requirements: 'Kembrijga umumiy ariza, Gates Cambridge inshosi, Gates uchun maxsus tavsiyanoma, yuqori akademik muvaffaqiyat sertifikatlari (IELTS 7.5+).',
    application_process: '1. Kembrij universitetining tegishli kursiga ariza topshirish bilan birga Gates grantiga ham belgi qo‘yish. 2. Departament tomonidan nomzodlar saralanishi. 3. Onlayn intervyu bosqichi.',
    official_website: 'https://www.gatescambridge.org',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH76ADacByYj3jyXMXyW6oc1h4hswO3cn9gQ&s',
    IELTS_requirement: '7.5',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '£1,562'
  },
  {
    id: 12,
    name: 'Knight-Hennessy Scholars (Stanford)',
    country: 'AQSh',
    type: 'To‘liq',
    provider: 'Stanford University / Knight-Hennessy Foundation',
    overview: 'Stanford universitetida istalgan magistrlik yoki doktorlik darajasida tahsil olishni to‘liq moliyalashtiruvchi, global muammolarni hal qilishga qaratilgan yetakchilik dasturi.',
    eligibility: 'Stanfordga qabul qilinish, bakalavriat diplomini topshirayotgan yildan boshlab oxirgi 7 yil ichida olgan bo‘lish.',
    coverage: 'To‘liq o‘qish to‘lovi, yashash va o‘quv qurollari uchun oylik stipendiya, aviachiptalar va akademik konferensiyalarda ishtirok etish uchun maxsus fondlar.',
    deadline: '2026-10-12',
    requirements: 'Stanfordga o‘qishga kirish arizasi, Knight-Hennessy onlayn arizasi, video-tanishuv, 2 ta insho, CV va 2 ta maxsus tavsiyanoma.',
    application_process: '1. Onlayn ariza to‘ldirish va video yuklash. 2. Yarim finalchilar e‘lon qilinishi. 3. Stanfordda o‘tkaziladigan "Immersion Weekend" (saralash lageri). 4. Yakuniy g‘oliblar e‘lon qilinishi.',
    official_website: 'https://knight-hennessy.stanford.edu',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS86foyaiHf8LnlpEAfRXG3BpiB6akhPDoYtg&s',
    IELTS_requirement: '7.5',
    SAT_requirement: '1500 (tavsiya)',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '$3,000+'
  },
  {
    id: 13,
    name: 'Swiss Government Excellence Scholarships',
    country: 'Shveysariya',
    type: 'To‘liq',
    provider: 'Shveysariya Federal Hukumati (FCS)',
    overview: 'Xalqaro tadqiqotchilar va san‘at namoyandalariga Shveysariyaning nufuzli davlat universitetlari yoki texnologiya institutlarida PhD yoki Postdoc darajasida tadqiqot olib borish uchun taqdim etiladigan to‘liq grant.',
    eligibility: 'Bakalavr yoki magistr darajasiga ega bo‘lish, Shveysariya professori tomonidan ilmiy rahbarlik maktubiga ega bo‘lish.',
    coverage: 'Oylik yashash stipendiyasi (CHF 1,920), tibbiy sug‘urta, bir martalik viza va aviachipta nafaqasi, Shveysariya jamoat transporti uchun chegirmali kartalar.',
    deadline: '2026-11-30',
    requirements: 'Batafsil tadqiqot taklifi (Research Proposal), Shveysariyalik professorning rozilik xati, 2 ta tavsiyanoma, ingliz/fransuz/nemis tillarini bilish sertifikati.',
    application_process: '1. Mahalliy Shveysariya elchixonasidan ariza paketini olish. 2. Hujjatlarni elchixonaga topshirish. 3. Shveysariya Federal Komissiyasi (FCS) tomonidan yakuniy saralash.',
    official_website: 'https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships',
    image: 'https://euraxess.ec.europa.eu/sites/default/files/2024-08/Switzerland%20-%20Swiss%20Government%20Excellence%20Scholarships.png',
    IELTS_requirement: '7.0',
    SAT_requirement: 'N/A',
    degree_level: 'PhD, Postdoc',
    monthly_stipend: 'CHF 1,920'
  },
  {
    id: 14,
    name: 'Singapore International Graduate Award (SINGA)',
    country: 'Singapur',
    type: 'To‘liq',
    provider: 'Singapur Fan, Texnologiya va Tadqiqotlar Agentligi (A*STAR)',
    overview: 'SINGA xalqaro talabalarga Singapurning jahon miqyosidagi eng nufuzli universitetlarida (NUS, NTU, SUTD) tabiiy fanlar va muhandislik yo‘nalishlarida to‘liq PhD darajasini olish uchun imkoniyat beradi.',
    eligibility: 'Tabiiy va texnik fanlar bo‘yicha bakalavr yoki magistr darajasiga ega bo‘lish, mukammal ingliz tili.',
    coverage: 'To‘liq o‘quv shartnomasi, oylik stipendiya (2,200 SGD - 2,700 SGD), bir martalik aviachipta nafaqasi (1,500 SGD) va joylashish nafaqasi (1,000 SGD).',
    deadline: '2026-06-01',
    requirements: 'Baholar transkripti, 2 ta akademik tavsiyanoma, ingliz tili sertifikati (IELTS 6.5+), tadqiqotga qiziqish inshosi.',
    application_process: '1. SINGA onlayn portalida ariza to‘ldirish va laboratoriyani tanlash. 2. Arizani universitet va A*STAR ekspertlari tomonidan tahlil qilish. 3. Texnik suhbat bosqichi.',
    official_website: 'https://graduatestudies.smu.edu.sg/phd/singa-smu-programme',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAfPzA7OndRZQB8LgZ025mvshG4DDvQzMUTA&s',
    IELTS_requirement: '6.5',
    SAT_requirement: 'N/A',
    degree_level: 'PhD',
    monthly_stipend: '2,200 - 2,700 SGD'
  },
  {
    id: 15,
    name: 'Eiffel Excellence Scholarship',
    country: 'Fransiya',
    type: 'To‘liq',
    provider: 'Fransiya Tashqi Ishlar Vazirligi',
    overview: 'Xorijiy davlatlarning eng yaxshi talabalarini Fransiyadagi magistratura va PhD dasturlariga jalb qilish maqsadida yaratilgan eng nufuzli fransuz granti.',
    eligibility: 'Magistratura uchun 25 yoshgacha, PhD uchun 30 yoshgacha bo‘lgan xalqaro nomzodlar, muhandislik, fan, iqtisodiyot yoki huquq yo‘nalishlari.',
    coverage: 'Oylik stipendiya (€1,181 - €1,400), Fransiyaga borish va qaytish aviachiptalari, tibbiy sug‘urta, madaniy tadbirlarda bepul ishtirok etish imkoniyati.',
    deadline: '2026-01-10',
    requirements: 'Fransiya universiteti tomonidan taqdim etiladigan nomzodlik hujjatlari (talaba to‘g‘ridan-to‘g‘ri o‘zi topshira olmaydi, uni universitet tavsiya qilishi kerak), CV, motivatsiya xati.',
    application_process: '1. Fransiya universitetiga o‘qishga topshirish va Eiffel grantiga nomzod qilib ko‘rsatishlarini so‘rash. 2. Universitet arizani Campus France-ga yuboradi. 3. Natijalarni e‘lon qilish.',
    official_website: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
    image: 'https://www.campusfrance.org/sites/default/files/medias/images/2022-12/logo_eiffel.jpg',
    IELTS_requirement: '6.5 (agar ingliz tilida o‘qisa)',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '€1,181 - €1,400'
  },
  {
    id: 16,
    name: 'Italian Government (MAECI) Scholarships',
    country: 'Italiya',
    type: 'To‘liq',
    provider: 'Italiya Tashqi Ishlar va Xalqaro Hamkorlik Vazirligi',
    overview: 'Xalqaro hamkorlikni mustahkamlash maqsadida Italiya davlati tomonidan xorijlik talabalarga Italiyadagi nufuzli davlat universitetlarida magistr yoki PhD darajalarida o‘qish uchun taqdim etiladigan to‘liq grant.',
    eligibility: 'Maksimal yosh chegarasi: Magistratura uchun 28 yosh, PhD uchun 30 yosh. Akademik jihatdan muvaffaqiyatli talaba bo‘lish.',
    coverage: 'Universitet o‘qish to‘lovidan to‘liq ozod qilish, oylik stipendiya (€900), tibbiy sug‘urta va italyan tili tayyorlov kurslari.',
    deadline: '2026-06-15',
    requirements: 'Universitetga ariza va qabul hujjati, ingliz tili sertifikati (IELTS 6.0+) yoki italyan tili (B2 daraja), motivatsiya xati.',
    application_process: '1. Study in Italy portalida ariza va hujjatlarni to‘ldirish. 2. Elchixona qo‘mitasi tomonidan nomzodlar ro‘yxatini shakllantirish va suhbat. 3. G‘oliblarni tasdiqlash.',
    official_website: 'https://studyinitaly.esteri.it',
    image: 'https://www.scholarshipregion.com/wp-content/uploads/2023/05/Italian-Government-Scholarship-1.jpg',
    IELTS_requirement: '6.0',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '€900'
  },
  {
    id: 17,
    name: 'Australian Government RTP Scholarships',
    country: 'Avstraliya',
    type: 'To‘liq',
    provider: 'Avstraliya Ta‘lim Departamenti',
    overview: 'Avstraliyaning eng yaxshi universitetlarida xalqaro tadqiqotchilarni jalb qilish uchun mo‘ljallangan to‘liq tadqiqot dasturi (Magistr va PhD).',
    eligibility: 'Xalqaro talabgor bo‘lish, Avstraliya universitetidan tadqiqot yo‘nalishida o‘qish taklifiga ega bo‘lish.',
    coverage: 'To‘liq o‘quv to‘lovlari (tuition offset), yillik yashash stipendiyasi ($30,000 - $35,000 AUD), tibbiy sug‘urta (OSHC), viza va safar xarajatlari.',
    deadline: '2026-08-31',
    requirements: 'Bakalavr/Magistr diplomi (birinchi darajali faxriy diplom ekvivalenti), kamida 2 ta ilmiy maqola (tavsiya), tadqiqot rejasi (Research Proposal), IELTS 7.0+.',
    application_process: '1. Avstraliyadagi universitetga (masalan, Melburn yoki Sidney) to‘g‘ridan-to‘g‘ri ariza berish. 2. RTP grantiga ham ariza yuborish. 3. Universitet akademik kengashi tomonidan baholanish.',
    official_website: 'https://www.education.gov.au/research-training-program',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA1lmTqBNHDJnFjLvVqURowi6YHjn4SwheYg&s',
    IELTS_requirement: '7.0',
    SAT_requirement: 'N/A',
    degree_level: 'Magistratura, PhD',
    monthly_stipend: '$2,500 AUD'
  },
  {
    id: 18,
    name: 'Lester B. Pearson International Scholarship',
    country: 'Kanada',
    type: 'To‘liq',
    provider: 'University of Toronto',
    overview: 'Toronto universiteti tomonidan har yili dunyo bo‘ylab eng iqtidorli va jamoatchilik ishlarida yetakchi bo‘lgan 37 nafar xalqaro talabaga beriladigan to‘liq bakalavriat granti.',
    eligibility: 'Kanada fuqarosi bo‘lmagan xalqaro talaba bo‘lish, maktabni tamomlayotgan yilida bo‘lish, maktab direktori tomonidan tavsiya etilish.',
    coverage: 'To‘liq 4 yillik bakalavriat o‘qish to‘lovi, o‘quv qurollari va kitoblar, yashash va turar joy xarajatlari, barcha majburiy to‘lovlar.',
    deadline: '2026-01-15',
    requirements: 'Maktab direktori tomonidan rasmiy nomzod qilib ko‘rsatilish (nomination), Toronto universitetiga ariza (OUAC), Pearson Scholarship insholari (IELTS 7.0+).',
    application_process: '1. O‘zingiz o‘qiyotgan maktabdan Pearson dasturiga nomzod qilib ko‘rsatilishni so‘rash. 2. Toronto universitetiga ariza berish. 3. Pearson granti uchun alohida onlayn arizani to‘ldirish.',
    official_website: 'https://future.utoronto.ca/pearson/about/',
    image: 'https://eac.edu.ng/wp-content/uploads/2022/11/Lester-B.-Pearson-International-Scholarship-1024x576.png',
    IELTS_requirement: '7.0',
    SAT_requirement: '1400 (tavsiya)',
    degree_level: 'Bakalavriat',
    monthly_stipend: 'Turar joy va oziq-ovqat bepul qoplanadi'
  },
  {
    id: 19,
    name: 'University of Bologna Study Grants',
    country: 'Italiya',
    type: 'Qisman',
    provider: 'Bologna Universiteti',
    overview: 'Italiyaning eng ko‘hna va nufuzli oliygohi bo‘lmish Bolonya universiteti xalqaro talabalarni jalb qilish maqsadida qisman moliyaviy yordam va kontrakt to‘lovidan ozod qilish dasturlarini taqdim etadi.',
    eligibility: 'Bolonya universitetining bakalavr yoki magistratura yo‘nalishlaridan biriga qabul qilinish, iqtisodiy holatni tasdiqlovchi hujjat (ISEE).',
    coverage: 'Yillik €11,053 miqdoridagi moliyaviy grant, o‘qish shartnomasi to‘lovidan to‘liq yoki qisman ozod qilish (Unibo Action 1 & 2).',
    deadline: '2026-05-31',
    requirements: 'SAT yoki TOLC imtihon natijalari (bakalavr uchun), GRE imtihon natijalari (magistr uchun), o‘quv ko‘rsatkichlari, IELTS 6.0+.',
    application_process: '1. Universitet saytida ro‘yxatdan o‘tib, mos kursga hujjat topshirish. 2. Unibo Action 2 arizasini to‘ldirish. 3. SAT / GRE ballari va baholar asosida saralanish.',
    official_website: 'https://www.unibo.it/en/study/study-grants-and-subsidies',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmz8QxAqRXp_pIO3097xMoKo1fFotMZcNbPA&s',
    IELTS_requirement: '6.0',
    SAT_requirement: '1250',
    degree_level: 'Bakalavr, Magistr',
    monthly_stipend: '€921'
  },
  {
    id: 20,
    name: 'President‘s Scholarship (Tsinghua University)',
    country: 'Xitoy',
    type: 'To‘liq',
    provider: 'Tsinghua Universiteti',
    overview: 'Xitoyning birinchi raqamli universiteti Tsinghua tomonidan dunyodagi eng iqtidorli talabalarga bakalavriat, magistratura va PhD darajasida tahsil olishlari uchun ajratiladigan maxsus to‘liq prezident granti.',
    eligibility: 'Xalqaro talaba bo‘lish, yuqori akademik o‘zlashtirish, liderlik va jamoat ishlarida faol bo‘lish.',
    coverage: '100% O‘quv shartnomasi, bepul universitet yotoqxonasi, oylik stipendiya (RMB 3,000 bakalavr, RMB 3,500 PhD), keng qamrovli tibbiy sug‘urta.',
    deadline: '2026-03-01',
    requirements: 'Tsinghua universitetiga o‘qishga kirish arizasi, insho, rasm va pasport, 2 ta xalqaro darajadagi tavsiyanoma, IELTS 7.0+ yoki HSK 5 (xitoy tili uchun).',
    application_process: '1. Tsinghua universitetining onlayn qabul tizimida ro‘yxatdan o‘tish va grant uchun belgi qo‘yish. 2. Akademik tekshiruv va universitet professorlarining baholashi. 3. Onlayn intervyu/suhbat.',
    official_website: 'https://www.tsinghua.edu.cn',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmZ8p3-PS1c5axNSb_t2fhyfOQzkraRWS_hA&s',
    IELTS_requirement: '7.0',
    SAT_requirement: '1450',
    degree_level: 'Bakalavr, Magistr, PhD',
    monthly_stipend: '3,000 - 3,500 RMB'
  }
];
const opportunitiesData = [
  // 🏆 TANLOVLAR (Competitions)
  {
    id: 1,
    title: 'Al-Khwarizmi Xalqaro Matematika va Informatika Olimpiadasi (KhIMIOs)',
    category: 'Tanlovlar',
    organization: 'KhIMIOs / O\'zbekiston',
    country: 'O\'zbekiston',
    level: 'Milliy → Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'KhIMIOs — O\'zbekiston tomonidan tashkil etilgan va har yili Toshkentda bo\'lib o\'tadigan nufuzli xalqaro olimpiada. Musobaqa ikki yo\'nalishda — matematika va informatika — olib o\'tiladi. Ishtirokchilar murakkab masalalar yechish orqali o\'z bilimlarini sinab ko\'radilar. Olimpiada nafaqat O\'zbekiston, balki Osiyo, Yevropa va boshqa mintaqalardan kelgan iqtidorli o\'quvchilarni bir arénaga to\'playdi. G\'oliblar medal va sertifikat oladi hamda yirik xalqaro olimpiadalar uchun tavsiya etiladi. Bu tanlov matematika va informatika sohasida karyera qurmoqchi bo\'lgan yoshlar uchun portfolio hamda rezyumeda kuchli qo\'shimcha hisoblanadi.',
    eligibility: 'Maktab o\'quvchilari va talabalar, matematika yoki informatikaga qiziquvchilar.',
    deadline: '2026-05-25',
    duration: '7 kun',
    benefits: 'Medalllar, sertifikat, xalqaro tan olinish.',
    application_link: 'https://www.khimio.uz/',
    image: 'https://yuz.uz/imageproxy/980x/https://yuz.uz/file/news/9f535e5e6d0db58769eabba3c359b196.png',
    certificate_available: 'Ha',
    age_requirement: '12–18',
    online_or_offline: 'Offline (Toshkent)',
    impact: 'Academic'
  },

  {
    id: 2,
    title: 'IOI 2026 — Xalqaro Informatika Olimpiadasi (Toshkent)',
    category: 'Tanlovlar',
    organization: 'IOI / O\'zbekiston',
    country: 'O\'zbekiston',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'IOI — dunyodagi eng obro\'li o\'quvchilar informatika musobaqasi bo\'lib, 1989-yildan buyon har yili o\'tkazib kelinadi. 2026-yilda bu musobaqa birinchi marta O\'zbekistonda — Toshkentda — bo\'lib o\'tadi, bu mamlakatimiz uchun katta faxr. Har bir mamlakat milliy tanlov orqali tanlangan 4 nafardan iborat jamoasini yuboradi. Ishtirokchilar ikki kun davomida algoritmik va dasturlash masalalarini yechilib, oltin, kumush yoki bronza medal uchun kurashadi. IOI g\'oliblari va ishtirokchilari Google, Meta, Apple kabi kompaniyalar va MIT, Stanford kabi top universitetlar tomonidan juda qadrlanadi. Bu olimpiadaga tayyorlanish o\'zi ham kuchli dasturchilik poydevori qurishga yordam beradi.',
    eligibility: 'Maktab o\'quvchilari (18 yoshgacha), milliy tanlov g\'oliblari.',
    deadline: '2026-08-09',
    duration: '1 hafta',
    benefits: 'Oltin/kumush/bronza medal, xalqaro nufuz, katta kompaniyalar e\'tibori.',
    application_link: 'https://ioi2026.uz/',
    image: 'https://ioinformatics.org/images/ioi_social.jpg',
    certificate_available: 'Ha',
    age_requirement: '14–18',
    online_or_offline: 'Offline (Toshkent)',
    impact: 'Academic & Career'
  },

  {
    id: 3,
    title: 'Google Hash Code — Jamoaviy Dasturlash Musobaqasi',
    category: 'Tanlovlar',
    organization: 'Google',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'Google Hash Code — Google muhandislari real ishda duch keladigan muhandislik muammolarini asosida tuzilgan xalqaro jamoaviy dasturlash musobaqasi. 2–4 kishilik jamoalar 4 soat ichida murakkab optimizatsiya masalalarini yechadi. Musobaqa onlayn bo\'lib, butun dunyo bo\'ylab mingllab jamoalar bir vaqtda ishtirok etadi. O\'z shahringizda "hub" ochib, do\'stlaringiz bilan birgalikda qatnashish ham mumkin. Natijalar global reytingda ko\'rinadi. Eng muhimi — yuqori natija ko\'rsatgan ishtirokchilar Google kompaniyasiga to\'g\'ridan-to\'g\'ri intervyuga taklif qilinadi. Hash Code — amaliy muhandislik ko\'nikmalarini sinab ko\'rish va Google e\'tiborini jalb qilishning eng qisqa yo\'llaridan biri.',
    eligibility: 'Dasturlash bilimiga ega o\'smirlar va talabalar, istalgan davlatdan.',
    deadline: '2026-02-28',
    duration: '1 kun (online hub)',
    benefits: 'Google-ga to\'g\'ridan-to\'g\'ri intervyu imkoniyati, xalqaro reyting, moliyaviy mukofotlar.',
    application_link: 'https://sites.google.com/view/dscutsg/hashcode',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLgETJKyxPpJaKY6mH2oFsiQttiTDpRt-JjQ&s',
    certificate_available: 'Ha',
    age_requirement: '16+',
    online_or_offline: 'Online',
    impact: 'Academic & Career'
  },

  {
    id: 4,
    title: 'Codeforces — Xalqaro Dasturlash Musobaqalari Platformasi',
    category: 'Tanlovlar',
    organization: 'Codeforces',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'Codeforces — dunyo bo\'ylab 1 milliondan ortiq dasturchi foydalanuvchi qatnashadigan competitive programming platformasi. Har hafta turli darajadagi musobaqalar (Div. 1, 2, 3, 4) o\'tkaziladi va har bir musobaqa ishtirokchiga reyting ball beradi. Reyting qanchalik yuqori bo\'lsa, shunchalik nufuzli unvon: Pupil, Specialist, Expert, Candidate Master, Master, Grandmaster. O\'zbekistonda Codeforces juda mashhur — ko\'plab o\'zbek dasturchilar xalqaro Grandmaster darajasiga ko\'tarilgan. Bu platforma ICPC, IOI va Google Code Jam kabi yirik musobaqalarga tayyorlanishning asosiy usuli hisoblanadi. Shuningdek, texnologiya kompaniyalari intervyuga tayyorlanish uchun ham Codeforces masalalaridan keng foydalanadi.',
    eligibility: 'Barcha yoshdagi dasturchilar, hech qanday maxsus talab yo\'q.',
    deadline: 'Har hafta ochiq',
    duration: 'Davomiy',
    benefits: 'Reyting, xalqaro tan olinish, ICPC va boshqa olympiadlarga yo\'l ochadi.',
    application_link: 'https://codeforces.com/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYWK0pVMN5rF0CTuiyG5RTeuIsG-7O3FmW4g&s',
    certificate_available: 'Ha (reyting sertifikati)',
    age_requirement: '12+',
    online_or_offline: 'Online',
    impact: 'Academic & Career'
  },

  {
    id: 5,
    title: 'UNESCO Science Club Challenge — Osiyo-Tinch okeani',
    category: 'Tanlovlar',
    organization: 'UNESCO',
    country: 'Xalqaro (Osiyo-Tinch okeani)',
    level: 'Xalqaro',
    field: 'Tabiiy Fanlar & STEM',
    overview: 'UNESCO Science Club Challenge — Osiyo-Tinch okeani mintaqasidagi maktab va yoshlar ilmiy klublari uchun o\'tkaziladigan nufuzli STEM musobaqasi. Dastur UNESCO\'ning Science Clubs Network tashabbusi doirasida amalga oshiriladi va maqsad — ilm-fan va texnologiyaga qiziqishni maktab darajasidan boshlab rag\'batlantirish. Qatnashuvchi klublar o\'z STEM loyihalarini taqdim etib, quyidagi mezonlar bo\'yicha baholanadi: loyihaning ijtimoiy ta\'siri, innovatsion g\'oya, amaliy qo\'llanilishi va barqarorligi. G\'oliblar global miqyosda e\'lon qilinadi, UNESCO sertifikati oladi va kelajakda xalqaro konferensiyalarga taklif etilishi mumkin. O\'zbekistondagi maktab ilmiy klublari ham ishtirok etishi mumkin.',
    eligibility: 'Maktab yoki yoshlar ilmiy klublari va ularning a\'zolari.',
    deadline: '2026-09-30',
    duration: '1–2 oy',
    benefits: 'Global tan olinish, UNESCO sertifikati, institusional mukofot.',
    application_link: 'https://www.unesco.org/en/articles/call-applications-science-club-challenge-2026-asia-pacific-edition',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-wvDOD-W43d8leIsSd0LfxYEIOniqA-LH-w&s',
    certificate_available: 'Ha',
    age_requirement: '12–25',
    online_or_offline: 'Online + Offline',
    impact: 'Academic & Social'
  },

  // 🔬 ILMIY TADQIQOTLAR (Research)
  {
    id: 6,
    title: 'Yale Central Asia Workshop — Ilmiy Maqola Taqdimoti',
    category: 'Ilmiy tadqiqotlar',
    organization: 'Yale University',
    country: 'Qozog\'iston (Almati)',
    level: 'Xalqaro',
    field: 'Ijtimoiy Fanlar',
    overview: 'Yale Central Asia Workshop (CAW) — Yale universitetining Markaziy Osiyo bo\'yicha ilmiy tadqiqot olib borayotgan magistratura va doktorantura talabalarini bir arénaga to\'plash uchun har yili o\'tkaziladigan ikki kunlik konferensiya. 2026-yilda Almati shahridagi KIMEP universitetida bo\'lib o\'tadi. Arizachilar o\'z tadqiqot maqolalarini topshiradi, tanlangan ishtirokchilar esa professorlar va tengdoshlari oldida taqdimot qiladi va fikr-mulohaza oladi. Sayohat, turar joy va ovqatlanish xarajatlari Yale tomonidan qoplanadi. Markaziy Osiyodan arizachilar ustuvor ko\'rib chiqiladi. Bu — O\'rta Osiyo tadqiqotchisi sifatida Yale tarmog\'iga kirish va xalqaro ilmiy muloqotda ishtirok etishning noyob imkoniyati.',
    eligibility: 'Magistratura (terminal emas) yoki PhD talabalar, gumanitar/ijtimoiy fan sohasida.',
    deadline: '2026-01-09',
    duration: '2 kun',
    benefits: 'Sayohat, turar joy, ovqat xarajatlari qoplanadi. Yale professorlari bilan muloqot.',
    application_link: 'https://macmillan.yale.edu/central-asia/stories/call-papers-yale-central-asia-workshop-almaty-may-2026',
    image: 'https://macmillan.yale.edu/sites/default/files/2025-10/Central%20Asia%20Workshop%202026%20Banner.png',
    certificate_available: 'Ha',
    age_requirement: '21+',
    online_or_offline: 'Offline (Almati)',
    impact: 'Research & Academic'
  },

  {
    id: 7,
    title: 'AFS Global STEM Academies — Xalqaro Ilmiy Akademiya',
    category: 'Ilmiy tadqiqotlar',
    organization: 'American Field Service (AFS)',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'Tabiiy Fanlar & STEM',
    overview: 'AFS Global STEM Academies — ilm-fan, texnologiya, muhandislik va matematika sohasiga ishtiyoqmand o\'smirlar uchun mo\'ljallangan to\'liq moliyalashtirilgan xalqaro dastur. Dastur ikki qismdan iborat: dastlab virtual o\'quv moduli, so\'ngra boshqa mamlakatlarda haqiqiy laboratoriya va amaliy tadqiqot tajribasi. Ishtirokchilar turli davlatlardan kelgan tengdoshlari bilan birgalikda real ilmiy muammolarga yechim izlaydi. Bu nafaqat ilmiy bilim, balki madaniyatlararo muloqot, liderlik va global fikrlash ko\'nikmalarini ham rivojlantiradi. Dastur barcha xarajatlarni qoplaydi — parvozdan tortib turar joygacha. O\'zbekiston o\'quvchilari ham ariza topshirishi mumkin.',
    eligibility: 'Maktab o\'quvchilari, fan va texnologiyaga qiziquvchilar.',
    deadline: '2026-03-31',
    duration: '3–4 hafta',
    benefits: 'To\'liq moliyalashtirilgan: sayohat, turar joy, o\'qish — barchasi bepul.',
    application_link: 'https://afs.org/global-stem/academies/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtk7A0gvK-87W_AbPbLKtA_jm1Pjt51QIwMw&s',
    certificate_available: 'Ha',
    age_requirement: '15–18',
    online_or_offline: 'Online + Offline',
    impact: 'Research & Academic'
  },

  {
    id: 8,
    title: 'UNDP/UNV Ijtimoiy Innovatsiya Dasturi — O\'zbekiston',
    category: 'Ilmiy tadqiqotlar',
    organization: 'UNDP & UNV',
    country: 'O\'zbekiston',
    level: 'Milliy',
    field: 'Ijtimoiy Fanlar',
    overview: 'UNDP va BMT Voluntyorlari (UNV) birgalikda O\'zbekistonda "Ijtimoiy Innovatsiya va Volontyorlik" loyihasini amalga oshirmoqda. Dastur O\'zbekiston yoshlariga mamlakatdagi rivojlanish muammolariga innovatsion yechimlar taklif qilish imkonini beradi. Qatnashuvchilar maxsus treninglardan o\'tadi, g\'oyalarini ishlab chiqadi va eng yaxshi loyihalar uchun grantlar ajratiladi. Shuningdek, dastur yoshlar uchun advokatsiya ko\'nikmalarini rivojlantiradi va ularni BMT tarmog\'i bilan bog\'laydi. Bu — O\'zbekistonda ijtimoiy muammolarni hal qilish va ayni paytda xalqaro tashkilotlar bilan ishlay boshlash uchun ajoyib platforma.',
    eligibility: 'O\'zbekiston yoshlari, innovatsion g\'oyalarga ega bo\'lganlar.',
    deadline: 'Davomiy',
    duration: 'Davomiy',
    benefits: 'Trening, grant, mentorlik, UNV tarmog\'iga kirish.',
    application_link: 'https://www.unv.org/unv-countries/uzbekistan',
    image: 'https://www.undp.org/sites/g/files/zskgke326/files/styles/explore_more_desktop/public/2026-01/addressing_the_climate_crisis_and_human_security_through_ndc_planning_and_implementation-01004035-page_thumbnail.jpg?h=1759f248&itok=uWsSjszN',
    certificate_available: 'Ha',
    age_requirement: '18–35',
    online_or_offline: 'Offline (O\'zbekiston)',
    impact: 'Social & Research'
  },

  // 🤝 VOLONTYORLIK (Volunteering)
  {
    id: 9,
    title: 'UNV — BMT Xalqaro Volontyorligi (O\'zbekiston fuqarolari uchun)',
    category: 'Volontyorlik',
    organization: 'United Nations Volunteers (UNV)',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'Umumiy (Barcha yo\'nalishlar)',
    overview: '2025-yil noyabrda UNV va O\'zbekiston Yoshlar Ishlari Agentligi o\'rtasida imzolangan tarixiy shartnoma asosida O\'zbekiston yoshlari endi to\'liq moliyalashtirilgan holda BMT tizimida xalqaro volontyor sifatida xizmat qilish imkoniga ega bo\'ldi. 2024-yilda 52 nafar o\'zbekistonlik BMT voluntyori sifatida turli mamlakatlarda xizmat qildi — ularning 69 foizi ayollar, o\'rtacha yoshi 26. UNV talent pool\'ida hozirda 816 nafar o\'zbekistonlik nomzod mavjud. Xizmat UNDP, UNFPA, UN Women kabi tashkilotlarda amalga oshiriladi. Bu — xalqaro tajriba orttirish, BMT karyerasiga qadam qo\'yish va global muammolarga hissa qo\'shishning eng to\'g\'ridan-to\'g\'ri yo\'li.',
    eligibility: 'O\'zbekiston fuqarolari, 18+, kasb-hunar ko\'nikmalariga ega.',
    deadline: 'Davomiy',
    duration: '6–12 oy',
    benefits: 'Oylik living allowance, aviachipta, sog\'liqni saqlash sug\'urtasi, sertifikat.',
    application_link: 'https://www.unv.org/become-volunteer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0U3QCXODh9wZ7Wa8C8r6vkOSk5wYlsZD-Fw&s',
    certificate_available: 'Ha',
    age_requirement: '18+',
    online_or_offline: 'Offline (xorijda)',
    impact: 'Social & Professional'
  },

  {
    id: 10,
    title: 'UNICEF O\'zbekiston — Talaba Volontyori',
    category: 'Volontyorlik',
    organization: 'UNICEF Uzbekistan',
    country: 'O\'zbekiston',
    level: 'Milliy',
    field: 'Ijtimoiy Fanlar',
    overview: 'UNICEF O\'zbekiston talabalarga maktab xavfsizligini oshirishga qaratilgan milliy kampaniyada faol ishtirok etish imkonini beradi. Talaba volontyorlar onlayn advokatsiya orqali maktablarda yong\'in va zilzila vaqtidagi xulq-atvor qoidalarini targ\'ib qiladilar va simulyatsiya mashqlari tashkil etishga yordam beradilar. Bu dastur nafaqat bolalar hayotini himoya qilishga, balki ishtirokchilarga UNICEF kabi global tashkilotning ichki ish jarayonlarini ko\'rish, professional tajriba va rasmiy UNICEF sertifikati olish imkonini ham beradi. Bunday tajriba kelajakdagi xalqaro tashkilotlarda ish yoki grant arizalarida sezilarli ustunlik yaratadi.',
    eligibility: 'O\'zbekiston universitetlari talabalari.',
    deadline: 'Tekshiring (davriy ochiladi)',
    duration: '1–3 oy',
    benefits: 'UNICEF sertifikati, tajriba, professional tarmoq.',
    application_link: 'https://www.unicef.org/uzbekistan/en/do-you-want-become-unicef-volunteer',
    image: 'https://xabar.uz/static/crop/3/1/920__95_3134381915.png',
    certificate_available: 'Ha',
    age_requirement: '18+',
    online_or_offline: 'Online + Offline',
    impact: 'Social'
  },

  {
    id: 11,
    title: 'FLEX — AQSHda 1 Yil O\'qish Almashinuv Dasturi',
    category: 'Volontyorlik',
    organization: 'U.S. Department of State / American Councils',
    country: 'AQSh',
    level: 'Xalqaro',
    field: 'Umumiy (Barcha yo\'nalishlar)',
    overview: 'FLEX (Future Leaders Exchange) — AQSh Davlat Departamenti tomonidan 1993-yildan buyon amalga oshirilib kelinayotgan va 29,000+ talabani qamrab olgan eng nufuzli o\'quvchilar almashinuv dasturlaridan biri. O\'zbekiston maktab o\'quvchilari bir o\'quv yili davomida AQSHdagi maktabda o\'qib, amerikalik oila bilan birga yashaydi. Tanlov uch bosqichdan iborat: onlayn ariza va insho, ingliz tili testi va to\'liq tanlov. Dastur to\'liq moliyalashtiriladi — parvoz, turar joy, ovqat, o\'qish, sog\'liqni saqlash xarajatlarining barchasi qoplanadi. FLEX bitiruvchilari ko\'pincha lider pozitsiyalariga ko\'tarilib, kuchli xalqaro tarmoq va ingliz tili ko\'nikmalarini egallagan holda vataniga qaytadilar.',
    eligibility: '9–10 sinf yoki litsey 1-kurs o\'quvchilari, O\'zbekiston fuqarolari.',
    deadline: '2026-09-16',
    duration: '1 o\'quv yili',
    benefits: 'To\'liq moliyalashtirilgan: parvoz, turar joy, o\'qish — barchasi bepul.',
    application_link: 'https://uzbekistan.americancouncils.org/flex-en',
    image: 'https://uz.usembassy.gov/wp-content/uploads/sites/251/2025/12/FLEX-logo-1024x620.png',
    certificate_available: 'Ha',
    age_requirement: '14–17',
    online_or_offline: 'Offline (AQSh)',
    impact: 'Academic & Cultural'
  },

  {
    id: 12,
    title: 'Global UGRAD — AQSHda 1 Semestr (Bakalavr)',
    category: 'Volontyorlik',
    organization: 'U.S. Department of State / World Learning',
    country: 'AQSh',
    level: 'Xalqaro',
    field: 'Umumiy (Barcha yo\'nalishlar)',
    overview: 'Global UGRAD (Undergraduate Exchange Program) — AQSh Davlat Departamenti tomonidan moliyalashtiriladigan va 2008-yildan beri 2,500+ talabani qamrab olgan bakalavr almashinuv dasturi. O\'zbekistonlik talabalar AQSHning turli universitetlarida bir semestr o\'qib, akademik ta\'limni jamoatchilik xizmati va madaniy almashinuv bilan uyg\'unlashtiradilar. Dastur doirasida ishtirokchilar professional ko\'nikmalar rivojlantirishga yo\'naltirilgan tadbirlarga qatnashadilar. Keyinchalik ko\'plab bitiruvchilar Fulbright granti, xalqaro stajirovka va top magistratura dasturlarini qo\'lga kiritishda muvaffaqiyat qozonishgan. AQSHda ilk marta yoki umuman chet elda bo\'lmaganlarga ustuvor imkoniyat beriladi.',
    eligibility: 'O\'zbekiston universitetlarida to\'liq vaqtli bakalavr talabalari, kamida 1 yil qolgan o\'qish.',
    deadline: 'Har yili oktyabr–noyabr',
    duration: '1 semestr',
    benefits: 'To\'liq moliyalashtirilgan: o\'qish, turar joy, stipendiya, aviachipta, sug\'urta.',
    application_link: 'https://uz.usembassy.gov/global-undergraduate-exchange-program/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVdLzkLDX3amaifbFcBh2bykaFO6RVEcGQGw&s',
    certificate_available: 'Ha',
    age_requirement: '18+',
    online_or_offline: 'Offline (AQSh)',
    impact: 'Academic & Professional'
  },

  {
    id: 13,
    title: 'YPIP — Yoshlar Professional Stajirovkasi (Toshkent)',
    category: 'Volontyorlik',
    organization: 'American Councils Uzbekistan',
    country: 'O\'zbekiston',
    level: 'Milliy',
    field: 'Biznes & Marketing',
    overview: 'YPIP (Young Professional Interns Program) — American Councils tomonidan tashkil etiladigan va O\'zbekistondagi xalqaro kompaniyalarda amaliy stajirovka imkonini beruvchi dastur. Ishtirokchilar Toshkentdagi taniqli biznes va STEM kompaniyalarida 3 oy davomida haqiqiy ish jarayonida qatnashadilar. Har bir stajyor uchun alohida biznes-mentor tayinlanadi. Dastur professional rivojlantish treninglari, sanoat liderlarining ma\'ruzalari va tengdoshlar tarmog\'ini ham o\'z ichiga oladi. Dastur shu bilan birga ishtirokchilarni "21-asr ish bozori" uchun tayyorlashni maqsad qiladi. O\'zbekiston fuqarolari uchun ish tajribasi va xalqaro biznes ko\'nikmalarini bir vaqtda olishning eng samarali usullaridan biri.',
    eligibility: 'O\'zbekiston universitetlari talabalari, biznes yoki STEM yo\'nalishi, O\'zbekiston fuqarolari.',
    deadline: '2025-12-08',
    duration: '3 oy',
    benefits: 'Modest stipendiya, mentorlik, professional tarmoq, sertifikat.',
    application_link: 'https://uzbekistan.americancouncils.org/ypi-en',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofIha54SEEzKZEaxrtzmB_4oBhwSV__6bgQ&s',
    certificate_available: 'Ha',
    age_requirement: '18+',
    online_or_offline: 'Offline (Toshkent)',
    impact: 'Professional'
  },

  // 💻 ONLAYN KURSLAR (Online Certifications)
  {
    id: 14,
    title: 'Google Career Certificates — Data Analytics, IT, Project Management',
    category: 'Onlayn kurslar',
    organization: 'Google / Coursera',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'Google Career Certificates — Google tomonidan ishlab chiqilgan va Coursera orqali taqdim etiluvchi professional darajadagi sertifikat kurslari to\'plami. Mavjud yo\'nalishlar: Data Analytics, IT Support, Project Management, UX Design, Cybersecurity va boshqalar. Har bir kurs oldingi tajribani talab etmaydi va o\'rtacha 3–6 oy ichida tugatiladi. Kurs yakunida Google sertifikati beriladi — bu sertifikat 150+ AQSh kompaniyasi, jumladan Google, Deloitte va Walmart tomonidan rasmiy tan olinadi. Coursera\'da "financial aid" orqali sertifikatni bepul olish ham mumkin. Hozirgi kunda dunyo bo\'ylab 1 milliondan ortiq kishi bu sertifikatlarni olgan.',
    eligibility: 'Hech qanday oldingi tajriba talab etilmaydi, barcha davlatlardan.',
    deadline: 'Davomiy',
    duration: '3–6 oy (o\'z sur\'atida)',
    benefits: 'Xalqaro tan olingan sertifikat, ish bozorida kuchli CV uchun asos.',
    application_link: 'https://grow.google/certificates/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfAW-LgVxRGAl6CZikBGTyvmhJtijsT00WWg&s',
    certificate_available: 'Ha',
    age_requirement: '16+',
    online_or_offline: 'Online',
    impact: 'Career'
  },

  {
    id: 15,
    title: 'Harvard CS50 — Kompyuter Fanlariga Kirish (Bepul)',
    category: 'Onlayn kurslar',
    organization: 'Harvard University',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'Harvard CS50 — onlayn ta\'limning eng mashhur kursi sifatida e\'tirof etilgan, Harvard universiteti professori David Malan tomonidan o\'qitiladigan kompyuter fanlariga kirish kursi. C, Python, SQL, JavaScript va veb-dasturlash asoslari, algoritmlar hamda ma\'lumotlar tuzilmasi o\'rgatiladi. Kurs bepul va to\'liq hajmda ochiq — hamma topshiriqlar, loyihalar va videolar bepul. Yakunida Harvard rasmiy sertifikati bepul beriladi (edX orqali tasdiqlangan sertifikat uchun $149). Butun dunyo bo\'ylab 4 milliondan ortiq kishi bu kursni o\'qigan. CS50 sertifikati ish suhbatlarida kuchli signal — bu Harvard darajasidagi kursni tugatganingizning isboti.',
    eligibility: 'Oldingi tajriba talab etilmaydi, barcha davlatlardan.',
    deadline: 'Davomiy',
    duration: '12 hafta (o\'z sur\'atida)',
    benefits: 'Harvard sertifikati (bepul), kuchli portfolio, dasturlash asoslari.',
    application_link: 'https://cs50.harvard.edu/x/',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrptqQPJhDsM9_j6l-jT2nKSR6CoDcmx_VVw&s',
    certificate_available: 'Ha (bepul)',
    age_requirement: '14+',
    online_or_offline: 'Online',
    impact: 'Academic & Career'
  },

  {
    id: 16,
    title: 'IBM Data Science Professional Certificate',
    category: 'Onlayn kurslar',
    organization: 'IBM / Coursera',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'IBM Data Science Professional Certificate — texnologiya giganti IBM tomonidan ishlab chiqilgan va 10 ta moduldan iborat professional sertifikat dasturi. Dastur Python dasturlash tili, SQL, ma\'lumotlarni tahlil qilish, vizualizatsiya (Matplotlib, Seaborn), Machine Learning (Scikit-learn) va real loyihalarni qamrab oladi. Ishtirokchilar amaliy capstone loyihasida haqiqiy ma\'lumotlar bilan ishlaydi va natijalarini portfolio sifatida taqdim etadi. Kurs yakunida IBM rasmiy sertifikati va Credly badge beriladi — bu badge LinkedIn profiliga to\'g\'ridan-to\'g\'ri qo\'shiladi. Data Science bugungi kunda eng yuqori maosh to\'lanadigan kasblar ro\'yxatida — bu kurs shu karyeraga kirish uchun eng qisqa yo\'llaridan biri.',
    eligibility: 'Oldingi tajriba talab etilmaydi, barcha davlatlardan.',
    deadline: 'Davomiy',
    duration: '4–6 oy (o\'z sur\'atida)',
    benefits: 'IBM sertifikati, Credly badge, karyeraga yo\'naltirilgan ko\'nikmalar.',
    application_link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
    image: 'https://images.credly.com/images/0da411a5-24e9-4991-9756-ca5f6073e7af/image.png',
    certificate_available: 'Ha',
    age_requirement: '16+',
    online_or_offline: 'Online',
    impact: 'Career'
  },

  {
    id: 17,
    title: 'Microsoft AI & Azure — Bepul Sertifikat Kurslari',
    category: 'Onlayn kurslar',
    organization: 'Microsoft Learn',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'Microsoft Learn — Microsoft tomonidan bepul taqdim etiladigan keng qamrovli o\'quv platformasi. AI Fundamentals (AI-900), Azure Fundamentals (AZ-900), Data Fundamentals (DP-900), Security Fundamentals (SC-900) va Power BI kabi kurslari mavjud. Har bir kurs modullarga bo\'lingan bo\'lib, interaktiv mashqlar va sinovlar orqali o\'qitiladi. Kurs yakunida Microsoft rasmiy sertifikati beriladi. Ba\'zi sertifikatlar uchun to\'lov talab etilsa-da, ko\'plab bazaviy kurslar to\'liq bepul. Microsoft texnologiyalari dunyo bo\'yicha 90%+ korporativ muhitda qo\'llaniladi — bu sertifikatlar IT sohasiga kirish yoki lavozimni oshirish uchun juda qimmatli.',
    eligibility: 'Barcha yoshdagilar, hech qanday oldingi tajriba talab etilmaydi.',
    deadline: 'Davomiy',
    duration: '4–20 soat (kursga qarab)',
    benefits: 'Microsoft sertifikati, Azure kredit, LinkedIn profiliga qo\'shish.',
    application_link: 'https://learn.microsoft.com/',
    image: 'https://www.lits.services/wp-content/uploads/2024/11/Intelligence-Azure-AI.jpg',
    certificate_available: 'Ha (bepul)',
    age_requirement: '14+',
    online_or_offline: 'Online',
    impact: 'Career'
  },

  {
    id: 18,
    title: 'Meta Social Media Marketing Professional Certificate',
    category: 'Onlayn kurslar',
    organization: 'Meta / Coursera',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'Biznes & Marketing',
    overview: 'Meta Social Media Marketing Professional Certificate — Facebook, Instagram va WhatsApp\'ning egasi Meta (sobiq Facebook) tomonidan Coursera platforma orqali taqdim etiladi. 6 ta kursdan iborat bu dasturda kontent strategiyasi yaratish, Facebook va Instagram\'da to\'langan reklama kampaniyalarini boshqarish, Meta Business Suite bilan ishlash va reklama samaradorligini o\'lchash o\'rgatiladi. Kurs yakunida Meta rasmiy sertifikati beriladi va u LinkedIn profiliga avtomatik qo\'shiladi. Hozirgi kunda O\'zbekistonda ham SMM mutaxassislariga talab juda yuqori — mahalliy bizneslar, startaplar va xalqaro kompaniyalar ushbu ko\'nikmalarga ega mutaxassislarni izlaydi.',
    eligibility: 'Oldingi tajriba talab etilmaydi, barcha davlatlardan.',
    deadline: 'Davomiy',
    duration: '5–7 oy (o\'z sur\'atida)',
    benefits: 'Meta sertifikati, amaliy portfolio, freelance va ish uchun tayyor ko\'nikmalar.',
    application_link: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRq5bgUYx2HiqM_KtTp5N-6mn5Gt17HYlVw&s',
    certificate_available: 'Ha',
    age_requirement: '16+',
    online_or_offline: 'Online',
    impact: 'Career'
  },

  {
    id: 19,
    title: 'freeCodeCamp — Bepul Web Development va Data Science',
    category: 'Onlayn kurslar',
    organization: 'freeCodeCamp',
    country: 'Xalqaro',
    level: 'Xalqaro',
    field: 'IT & Kompyuter Fanlari',
    overview: 'freeCodeCamp — 40,000+ soatlik o\'quv materialini to\'liq bepul taqdim etuvchi notijorat dasturlash platformasi. HTML, CSS, JavaScript, React, Node.js, Python, Data Analysis va Machine Learning kabi yo\'nalishlarda keng qamrovli kurslar mavjud. Har bir yo\'nalishda 300 soatlik loyihalar va topshiriqlar mavjud bo\'lib, ularni tugatgach rasmiy sertifikat beriladi. freeCodeCamp alumni\'lari Google, Microsoft, Apple va Amazon kabi kompaniyalarda ishlaydi. Platformada 9 ta sertifikat yo\'nalishi mavjud. Hech qanday to\'lov, hech qanday obuna talab etilmaydi — barchasi 100% bepul. O\'zbekistonda dasturlashni o\'rganib, xalqaro bo\'zorga chiqmoqchi bo\'lganlar uchun ideal boshlang\'ich nuqta.',
    eligibility: 'Hech qanday tajriba talab etilmaydi, to\'liq bepul, barcha davlatlardan.',
    deadline: 'Davomiy',
    duration: '300+ soat (o\'z sur\'atida)',
    benefits: 'Sertifikat, real loyihalar, portfolio, GitHub integratsiyasi.',
    application_link: 'https://www.freecodecamp.org/',
    image: 'https://i.pcmag.com/imagery/reviews/01tPXClg2WjLamQzScplH3y-15..v1627670281.png',
    certificate_available: 'Ha (bepul)',
    age_requirement: '14+',
    online_or_offline: 'Online',
    impact: 'Career'
  },

  {
    id: 20,
    title: 'Erasmus Mundus Joint Masters — Yevropada Magistratura',
    category: 'Onlayn kurslar',
    organization: 'Yevropa Komissiyasi',
    country: 'Yevropa (bir necha mamlakat)',
    level: 'Xalqaro',
    field: 'Umumiy (Barcha yo\'nalishlar)',
    overview: 'Erasmus Mundus Joint Masters (EMJM) — Yevropa Komissiyasi tomonidan moliyalashtiriladigan va to\'liq grant asosida Yevropaning 2–4 ta universitetida birgalikda magistratura o\'qish imkonini beruvchi dastur. Har yili yuzlab xalqaro yo\'nalishlar — muhandislik, iqtisodiyot, psixologiya, ekologiya, IT va boshqalarda — qabul ochiladi. Har bir dastur o\'z konsortiumiga kiruvchi Yevropa universitetlari tomonidan boshqariladi. Grant to\'liq qoplaydi: o\'qish to\'lovi, oylik stipendiya (€1,000+), aviachipta va sug\'urta. O\'zbekistondan 2025/2026 yil uchun 13 nafar talaba tanlangan. Dastur bitiruvchilariga bir necha Yevropa universitetining qo\'sh diplomi beriladi — bu global karyera uchun nihoyatda kuchli asos.',
    eligibility: 'Bakalavr diplomi mavjud, ingliz tili bilimi, barcha davlatlardan.',
    deadline: 'Dasturga qarab (yanvar–fevral)',
    duration: '2 yil',
    benefits: 'To\'liq moliyalashtirilgan: o\'qish, stipendiya €1,000+/oy, aviachipta.',
    application_link: 'https://www.eacea.ec.europa.eu/scholarships/emjmd-catalogue',
    image: 'https://erasmus.uz/storage/pages/January2025/Fm8NoAOnXQljvnoNsIQx.jpeg',
    certificate_available: 'Ha',
    age_requirement: '21+',
    online_or_offline: 'Offline (Yevropa)',
    impact: 'Academic & Research'
  }
];

const lessonsData = [
  {
    id: 'l1',
    title: 'Universitetlarga Hujjat Topshirish Bir Videoda: Common App Master-Klass',
    category: 'Apply Guide',
    duration: '47 daqiqa',
    difficulty: 'O\'rtacha',
    thumbnail: 'https://i.ytimg.com/vi/0KkVLt6LS3Q/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/0KkVLt6LS3Q',
    instructor: 'Asadbek Urakov',
    short_description: 'AQSh va xalqaro top oliygohlarga hujjat topshirish uchun yagona tizim — Common App platformasini 0 dan boshlab to\'liq sozlash, profildagi xatolardan qochish va arizani yuborishga tayyorlash bo\'yicha mukammal qo\'llanma.',
    tags: ['USA', 'CommonApp', 'Bakalavr', 'EarlyDecision'],
    recommendedFor: ['AQSh', 'Xalqaro']
  },
  {
    id: 'l2',
    title: 'Universitet Tanlash Strategiyasi: To\'g\'ri List Shakllantirish',
    category: 'Apply Guide',
    duration: '13 daqiqa',
    difficulty: 'O\'rtacha',
    thumbnail: 'https://i.ytimg.com/vi/xRL3Hvls-kQ/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/xRL3Hvls-kQ',
    instructor: 'Asadbek Urakov',
    short_description: 'Dunyo miqyosidagi 25,000 dan ortiq oliygohlar ichidan o\'zingizga 100% mos keladigan, grant beradigan va yo\'nalishingizga tushadigan top universitetlar ro\'yxatini mustaqil tuzish bo\'yicha mukammal algoritm.',
    tags: ['CollegeList', 'UniversityRanking', 'FinancialAid', 'Mentorlik'],
    recommendedFor: ['AQSh', 'Xalqaro', 'Evropa']
  },
  {
    id: 'l3',
    title: 'Universitetlarga 100% Grant Olish Siri: Insholar (Essays) Bilan Ishlash',
    category: 'Essay Writing',
    duration: '16 daqiqa',
    difficulty: 'O\'rtacha',
    thumbnail: 'https://i.ytimg.com/vi/PfHkFrBzWXk/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/PfHkFrBzWXk',
    instructor: 'Asadbek Urakov',
    short_description: 'Bir xil akademik ko\'rsatkichlarga (IELTS/SAT) ega bo\'lgan talabalar ichidan aynan siz qanday qilib ajralib chiqishingiz va insho orqali xarakteringizni ko\'rsatib, to\'liq grant yutishingiz mumkinligi haqida darslik.',
    tags: ['PersonalStatement', 'SupplementalEssays', 'CollegeAdmission', 'GrantXatoliklari'],
    recommendedFor: ['All']
  },
  {
    id: 'l4',
    title: 'Xalqaro Standartlarga Mos Rezyume (Resume/CV) Tuzish',
    category: 'Career & Profile',
    duration: '15 daqiqa',
    difficulty: 'O\'rtacha',
    thumbnail: 'https://i.ytimg.com/vi/WwrTC07VEXU/sddefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/WwrTC07VEXU',
    instructor: 'Mohinur Inamova',
    short_description: 'Global va mahalliy top kompaniyalar HR mutaxassislari e\'tiborini tortadigan, ATS (Applicant Tracking System) tizimlaridan o\'tadigan professional rezyume shakllantirish algoritmi.',
    tags: ['Resume', 'CV', 'JobSearch', 'Karyera', 'UstozAI'],
    recommendedFor: ['Talabalar', 'Frilanserlar', 'Xalqaro Ish']
  },
  {
    id: 'l5',
    title: 'IELTS Imtihonida 100% Natija Ko\'rsatish Uchun Buni Bilish Shart',
    category: 'IELTS / SAT',
    duration: '17 daqiqa',
    difficulty: 'O\'rtacha',
    thumbnail: 'https://i.ytimg.com/vi/Ftqrxnrfvwo/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/Ftqrxnrfvwo',
    instructor: 'Teacher Azam (Englify School)',
    short_description: 'Haqiqiy IELTS imtihonida o\'z mahoratingizni to\'liq ko\'rsatish uchun nima qilish va nima qilmaslik kerak. Imtihon oldidan psixologik va texnik tayyorgarlik, keng tarqalgan xatolar va ulardan qochish yo\'llari.',
    tags: ['IELTS', 'InglizTili', 'ImtihonTayyorgarlik', 'Englify'],
    recommendedFor: ['IELTS Tayyorlanuvchilar', 'Talabalar', 'Chet Elga Chiqmoqchi Bo\'lganlar']
  },
  {
    id: 'l6',
    title: 'Türkiye Burslari: Turkiyada 100% Grantga Qanday Topshiriladi?',
    category: 'Scholarships',
    duration: '13 daqiqa',
    difficulty: 'Boshlang\'ich',
    thumbnail: 'https://i.ytimg.com/vi/yEGbOkz84J8/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/yEGbOkz84J8',
    instructor: 'Campus',
    short_description: 'Türkiye Burslari davlat granti orqali Turkiyada 100% bepul o\'qish imkoniyati. Grant shartlari, kerakli hujjatlar ro\'yxati va ariza topshirish jarayoni bakalavr va magistratura bosqichi uchun batafsil tushuntirilgan.',
    tags: ['TürkiyeBurslari', 'TurkiyaGranti', 'BepulOqish', 'XorijdaOqish', 'Grant2026'],
    recommendedFor: ['All']
  },
  {
    id: 'l7',
    title: 'To\'liq Bepul SAT Ingliz Tili Kursi (O\'zbek tilida) | 1200+ Ball',
    category: 'IELTS / SAT',
    duration: '3 soat',
    difficulty: 'O\'rtacha',
    thumbnail: 'https://i.ytimg.com/vi/d56Q7GyQDcQ/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/d56Q7GyQDcQ',
    instructor: 'SAT Uzbekistan',
    short_description: 'O\'zbek tilida to\'liq va bepul SAT Ingliz tili kursi. Kirish, Writing darslari va Reading strategiyalari batafsil tushuntirilgan. Digital SAT formatiga mos.',
    tags: ['SAT', 'DigitalSAT', 'BepulKurs', 'SATInglizTili'],
    recommendedFor: ['SAT', 'AQSH']
  },
  {
    id: 'l8',
    title: 'Hamma Sun\'iy Intellektlardan Foydalanishni 1 Videoda O\'rgataman',
    category: 'Career & Profile',
    duration: '16 daqiqa',
    difficulty: 'Oson',
    thumbnail: 'https://i.ytimg.com/vi/eCkuazw-DNU/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/eCkuazw-DNU',
    instructor: 'Ustoz AI',
    short_description: 'ChatGPT, Midjourney, Freepik, Leonardo AI, Runway, Hedra va Sora kabi eng mashhur sun\'iy intellekt vositalaridan amaliy foydalanishni bitta videoda o\'rganing. Kontent yaratuvchilar va zamonaviy kasb egallari uchun to\'liq AI qo\'llanma.',
    tags: ['SuniyIntellekt', 'ChatGPT', 'Midjourney', 'AITools', 'KontentYaratish'],
    recommendedFor: ['Kontent Yaratuvchilar', 'Dizaynerlar', 'AI ga Qiziquvchilar']
  },
  {
    id: 'l9',
    title: '100% Scholarship Qo\'lga Kiritish Usuli | Top Universitetlarga Grant',
    category: 'Scholarships',
    duration: '5 daqiqa',
    difficulty: 'Oson',
    thumbnail: 'https://i.ytimg.com/vi/ILYR0MBPHkM/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/ILYR0MBPHkM',
    instructor: 'Marifat Jamal',
    short_description: 'Dunyoning top universitetlariga 100% grant yutib olishning aniq metodikasi. SAT 1590, IELTS 8.5 ga ega va o\'z akademiyasini qurgan Marifat Jamal tomonidan batafsil tushuntirilgan amaliy qo\'llanma.',
    tags: ['Scholarship', 'Grant', 'TopUniversity', 'CollegeAdmissions', 'MarifatJamal'],
    recommendedFor: ['All']
  },
  {
    id: 'l10',
    title: 'Necha Yoshdan Top Universitetlarga Tayyorlanish Kerak?',
    category: 'Apply Guide',
    duration: '1 soat',
    difficulty: 'O\'rtacha',
    thumbnail: 'https://i.ytimg.com/vi/5DuUshhGlpA/maxresdefault.jpg',
    youtube_link: 'https://www.youtube.com/embed/5DuUshhGlpA',
    instructor: 'Levsha',
    short_description: 'Dunyoning top universitetlariga kirish uchun qachondan tayyorlanish boshlash kerak? Yoshga qarab strategiya, vaqt rejasi va eng muhim qadamlar haqida amaliy maslahat.',
    tags: ['TopUniversity', 'Admissions', 'Tayyorgarlik', 'YoshlarUchun'],
    recommendedFor: ['All']
  }
];

const communityData = {
  questions: [
    { id: 1, title: 'IELTS 6.5 bilan qaysi universitetlarga topshirsam bo‘ladi?', author: 'Javohir T.', replies: 12, upvotes: 45, date: '2 soat oldin', tags: ['IELTS', 'Bakalavr'] },
    { id: 2, title: 'CommonApp essay qanday yoziladi? Maslahatlar kerak', author: 'Madina K.', replies: 8, upvotes: 32, date: 'Kecha', tags: ['Essay', 'AQSh'] },
    { id: 3, title: 'GKS granti uchun yosh chegarasi qanday?', author: 'Alisher B.', replies: 5, upvotes: 18, date: '2 kun oldin', tags: ['GKS', 'Koreya'] },
    { id: 4, title: 'Tavsiyanoma (Recommendation Letter) kimdan olinadi?', author: 'Sevinch A.', replies: 15, upvotes: 56, date: '3 kun oldin', tags: ['Hujjatlar'] },
    { id: 5, title: 'SAT Math uchun qaysi kitoblar eng yaxshisi?', author: 'Bekzod N.', replies: 21, upvotes: 89, date: '1 hafta oldin', tags: ['SAT'] },
    { id: 6, title: 'Germaniyada o\'qish uchun nemis tili shartmi?', author: 'Olim J.', replies: 9, upvotes: 27, date: '1 hafta oldin', tags: ['Germaniya'] }
  ],
  stories: [
    { id: 1, name: 'Malika Karimova', uni: 'MIT', country: 'AQSh', scholarship: 'To\'liq moliyalashtirilgan', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', snippet: 'MIT ga qabul qilinishim asosan mening ijtimoiy loyihalarimga bog\'liq bo\'ldi...', fullStory: 'Men MIT ga qabul jarayonini 10-sinfdan boshlaganman. Eng qiyin qismi insho yozish bo\'ldi...', challenges: 'SAT dagi past ballimni amaliy loyihalar bilan yopishga harakat qildim.', advice: 'Insholaringizda o\'zingizning asl yuzingizni ko\'rsating. Boshqalarga o\'xshashga harakat qilmang.' },
    { id: 2, name: 'Sardor Ibragimov', uni: 'KAIST', country: 'Janubiy Koreya', scholarship: 'GKS Granti (100%)', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', snippet: 'Koreyada o\'qishni orzu qilganlar uchun GKS eng zo\'r yo\'l. Mening tayyorgarligim...', fullStory: 'GKS orqali KAIST ga kirish oson emas, lekin to\'g\'ri reja bilan erishsa bo\'ladi...', challenges: 'Koreys tilini umuman bilmasdim, bu menga ancha qiyinchilik tug\'dirdi.', advice: 'Iloji boricha ertaroq til o\'rganishni boshlang va ilmiy ishlarga e\'tibor qarating.' },
    { id: 3, name: 'Laylo Rustamova', uni: 'University of Oxford', country: 'Buyuk Britaniya', scholarship: 'Chevening Granti', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', snippet: 'Chevening orqali Oksfordda huquq magistraturasi. Qanday qilib kuchli essay yozdim?', fullStory: 'Buyuk Britaniyaga topshirish o\'ziga xos tizimga ega...', challenges: 'Interview bosqichi juda qattiq stress bo\'lgan.', advice: 'Networking ga qattiq e\'tibor bering, har bir tanishuv yangi eshik ochadi.' },
    { id: 4, name: 'Jasur Aliyev', uni: 'Technical University of Munich', country: 'Germaniya', scholarship: 'DAAD', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', snippet: 'Germaniyada bepul ta\'lim: Myunxen Texnika Universitetiga yo\'l', fullStory: 'DAAD granti Germaniyada yashash xarajatlarini ham qoplaydi...', challenges: 'Byurokratiya va hujjat to\'plash jarayoni juda uzoq vaqt oldi.', advice: 'Barcha hujjatlarni kamida 3 oy oldin tayyorlab qo\'ying.' }
  ],
  announcements: [
    { id: 1, title: 'El-Yurt Umidi Jamg‘armasi yangi tanlovi e’lon qilindi', category: 'Muhim', date: 'Bugun', desc: 'Bakalavriat, magistratura va doktorantura uchun navbatdagi qabul boshlandi.' },
    { id: 2, title: 'AQSh elchixonasida "Study in USA" ko\'rgazmasi', category: 'Tadbir', date: 'Ertaga', desc: 'Vakillar bilan yuzma-yuz uchrashish va savollaringizga javob olish imkoniyati.' },
    { id: 3, title: 'UApply platformasida yangi IELTS darslari', category: 'Yangilik', date: '3 kun oldin', desc: 'O\'quv markazi bo\'limiga Speaking va Writing bo\'yicha yangi master-klasslar qo\'shildi.' },
    { id: 4, title: 'Chevening grantiga hujjatlar qabuli boshlanish arafasida', category: 'Muhim', date: '1 hafta oldin', desc: 'Buyuk Britaniyada magistratura o\'qish uchun arizalar tayyorlashni hozirdan boshlang.' }
  ],
  mentors: [
    { id: 1, name: 'Shahzoda Aliyeva', uni: 'Harvard University', country: 'AQSh', major: 'Kompyuter fanlari', scholarship: 'To\'liq', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', bio: 'Harvardda 2-kurs talabasi. CommonApp va insholar bo\'yicha yordam bera olaman.' },
    { id: 2, name: 'Bekzod Qodirov', uni: 'Seoul National University', country: 'Janubiy Koreya', major: 'Biznes', scholarship: 'GKS', photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80', bio: 'Koreyadagi eng kuchli universitetda GKS granti asosida o\'qiyman. Hujjat tayyorlash bo\'yicha mentor.' },
    { id: 3, name: 'Nigina Toirova', uni: 'University of Toronto', country: 'Kanada', major: 'Biotexnologiya', scholarship: 'Lester B. Pearson', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', bio: 'Kanadaga grant bilan kelish bo\'yicha o\'z tajribam bilan bo\'lishaman.' },
    { id: 4, name: 'Aziz Mahmudov', uni: 'TUM', country: 'Germaniya', major: 'Muhandislik', scholarship: 'DAAD', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', bio: 'DAAD stipendianti. Germaniyadagi o\'quv tizimi va yashash sharoitlari haqida maslahatlar.' },
    { id: 5, name: 'Madina Umarova', uni: 'University of Melbourne', country: 'Avstraliya', major: 'San\'at', scholarship: 'Qisman', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', bio: 'IELTS 8.0 egasi va Avstraliya vizasi bo\'yicha yordamchi.' },
    { id: 6, name: 'Doston Ro\'ziyev', uni: 'Politecnico di Milano', country: 'Italiya', major: 'Dizayn', scholarship: 'DSU Granti', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', bio: 'Italiyada davlat granti orqali tekin o\'qish va yashash haqida barchasi.' }
  ],
  consultants: [
    { id: 1, name: 'Dr. Kamola Asadova', specialization: 'AQSh Admissions', experience: '10 yil', countries: ['AQSh', 'Kanada'], photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', bio: 'Ivy League universitetlariga 50+ o\'quvchilarni muvaffaqiyatli tayyorlagan.' },
    { id: 2, name: 'Jamshid Xoliqov', specialization: 'Yevropa grantlari', experience: '7 yil', countries: ['Buyuk Britaniya', 'Germaniya', 'Italiya'], photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80', bio: 'Erasmus+, DAAD va Chevening bo\'yicha mutaxassis. Insholar tahriri.' },
    { id: 3, name: 'Sevara Qosimova', specialization: 'Osiyo va IELTS', experience: '5 yil', countries: ['Janubiy Koreya', 'Yaponiya', 'Xitoy'], photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', bio: 'GKS va MEXT grantlari eksperti. Muxolif intervular tayyorlaydi.' }
  ]
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const getCustomMatchScore = (uni, user) => {
  if (!user) return 70;
  let score = 40; 
  if (user.countries && user.countries.includes(uni.country)) score += 20;
  if (user.major && user.major !== 'Hali aniq emas' && uni.major === user.major) score += 15;
  const uniIELTS = parseFloat(uni.IELTS_requirement) || 6.5;
  let userIELTS = 0;
  if (user.english === 'C1–C2 (IELTS 7+)') userIELTS = 7.5;
  else if (user.english === 'B1–B2 (IELTS 4.5–6.5)') userIELTS = 6.0;
  else if (user.english === 'A1–A2 (IELTS 0–4)') userIELTS = 4.0;
  if (userIELTS >= uniIELTS) score += 15;
  else if (userIELTS >= uniIELTS - 1.0) score += 5;
  const uniSAT = parseInt(uni.SAT_requirement) || 1300;
  let userSAT = user.hasSat ? parseInt(user.satScore) || 0 : 0;
  if (userSAT >= uniSAT) score += 10;
  else if (userSAT >= uniSAT - 100) score += 5;
  return Math.min(score, 100);
};

const getScholarshipMatchScore = (grant, user) => {
  if (!user) return 75;
  let score = 45;
  if (user.countries && user.countries.includes(grant.country)) score += 25;
  const reqIELTS = parseFloat(grant.IELTS_requirement) || 6.0;
  let userIELTS = 0;
  if (user.english === 'C1–C2 (IELTS 7+)') userIELTS = 7.5;
  else if (user.english === 'B1–B2 (IELTS 4.5–6.5)') userIELTS = 6.0;
  else if (user.english === 'A1–A2 (IELTS 0–4)') userIELTS = 4.0;
  if (userIELTS >= reqIELTS) score += 15;
  return Math.min(score, 100);
};

const getOpportunityMatchScore = (opp, user) => {
  if (!user) return 75;
  let score = 40; 
  let majorMatch = false;
  if (user.major === 'IT / Kompyuter fanlari' && opp.field === 'IT') majorMatch = true;
  else if (user.major === 'Biznes / Iqtisodiyot' && opp.field === 'Business') majorMatch = true;
  else if (user.major === 'Tibbiyot' && opp.field === 'Medicine') majorMatch = true;
  else if (user.major === 'Muhandislik' && (opp.field === 'Engineering' || opp.field === 'Sciences')) majorMatch = true;
  else if (user.major === 'Dizayn / San’at' && opp.field === 'Arts') majorMatch = true;
  if (majorMatch) score += 25;
  if (user.countries && user.countries.includes(opp.country)) score += 20;
  else if (opp.country === 'Xalqaro') score += 15;
  if (user.grade === '11-sinf' && opp.category === 'Tanlovlar') score += 15;
  else if (user.grade !== '11-sinf' && (opp.category === 'Onlayn kurslar' || opp.category === 'Volontyorlik')) score += 15;
  return Math.min(score, 100);
};

export default function App() {
  const [user, setUser] = useState(() => storage.get('uapply_user') || null);
  const [currentPage, setCurrentPage] = useState(user ? 'dashboard' : 'home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const [savedItems, setSavedItems] = useState(() => storage.get('uapply_saved') || {
    universities: [],
    grants: [],
    opportunities: []
  });

  const [aiInitialPrompt, setAiInitialPrompt] = useState('');

  useEffect(() => {
    storage.set('uapply_user', user);
  }, [user]);

  useEffect(() => {
    storage.set('uapply_saved', savedItems);
  }, [savedItems]);

  useEffect(() => {
    if (user && currentPage === 'home') {
      setCurrentPage('dashboard');
    }
    if (!user && currentPage !== 'home') {
      setCurrentPage('home');
    }
  }, [user, currentPage]);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowOnboarding(false);
    setCurrentPage('dashboard');
  };

  const handleQuickLogin = () => {
    handleLogin({
      name: 'Foydalanuvchi',
      grade: '11-sinf',
      major: 'IT / Kompyuter fanlari',
      countries: ['AQSh', 'Janubiy Koreya'],
      english: 'B1–B2 (IELTS 4.5–6.5)',
      sat: '1350'
    });
  };

  const handleLogout = () => {
    setUser(null);
    storage.remove('uapply_user');
    storage.remove('uapply_saved');
    setSavedItems({ universities: [], grants: [], opportunities: [] });
    setCurrentPage('home');
  };

  const navigate = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  };

  const toggleSave = (type, id) => {
    setSavedItems(prev => {
      const currentList = prev[type] || [];
      const updatedList = currentList.includes(id) 
        ? currentList.filter(item => item !== id)
        : [...currentList, id];
      return { ...prev, [type]: updatedList };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
      {user && (
        <Navbar 
          user={user} 
          currentPage={currentPage} 
          navigate={navigate} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onLogout={handleLogout}
        />
      )}

      <main className={user ? "pt-20 pb-16 min-h-screen" : "min-h-screen"}>
        <AnimatePresence mode="wait">
          {showOnboarding ? (
             <Onboarding key="onboarding" onComplete={handleLogin} onCancel={() => setShowOnboarding(false)} />
          ) : (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {!user && currentPage === 'home' && <LandingPage onStart={() => setShowOnboarding(true)} onLogin={handleQuickLogin} />}
              {user && currentPage === 'dashboard' && (
                <Dashboard 
                  user={user} 
                  navigate={navigate} 
                  savedItems={savedItems}
                  toggleSave={toggleSave}
                  setAiInitialPrompt={setAiInitialPrompt}
                  onEditProfile={() => setShowOnboarding(true)}
                />
              )}
              {user && currentPage === 'universities' && <UniversitiesPage user={user} savedItems={savedItems} toggleSave={toggleSave} />}
              {user && currentPage === 'scholarships' && <ScholarshipsPage user={user} savedItems={savedItems} toggleSave={toggleSave} />}
              {user && currentPage === 'opportunities' && <OpportunitiesPage user={user} savedItems={savedItems} toggleSave={toggleSave} />}
              {user && currentPage === 'lessons' && <LessonsPage user={user} />}
              {user && currentPage === 'community' && <CommunityPage initialPrompt={aiInitialPrompt} setInitialPrompt={setAiInitialPrompt} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function Navbar({ user, currentPage, navigate, isMobileMenuOpen, setIsMobileMenuOpen, onLogout }) {
  const [showProfileDrop, setShowProfileDrop] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Boshqaruv paneli', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'universities', label: 'Universitetlar', icon: <Globe className="w-4 h-4" /> },
    { id: 'scholarships', label: 'Grantlar', icon: <Award className="w-4 h-4" /> },
    { id: 'opportunities', label: 'Imkoniyatlar', icon: <Star className="w-4 h-4" /> },
    { id: 'lessons', label: 'Darslar', icon: <PlayCircle className="w-4 h-4" /> },
    { id: 'community', label: 'Hamjamiyat', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('dashboard')}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mr-3 shadow-sm shadow-blue-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">UApply</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
                  currentPage === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowProfileDrop(!showProfileDrop)}
                className="flex items-center space-x-2 p-1 pr-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium">{user.name || 'Student'}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {showProfileDrop && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-slate-100 py-2"
                  >
                    <button onClick={() => { setShowProfileDrop(false); navigate('dashboard'); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                      <UserIcon className="w-4 h-4 mr-2" /> <span>Profil</span>
                    </button>
                    <button onClick={() => { setShowProfileDrop(false); navigate('dashboard'); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                      <Settings className="w-4 h-4 mr-2" /> <span>Sozlamalar</span>
                    </button>
                    <hr className="my-1 border-slate-100" />
                    <button 
                      onClick={() => { setShowProfileDrop(false); onLogout(); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> <span>Chiqish</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center space-x-3 ${
                    currentPage === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button onClick={onLogout} className="w-full text-left px-4 py-3 text-red-600 flex items-center space-x-3 mt-4 border-t border-slate-100">
                <LogOut className="w-4 h-4" /> <span>Chiqish</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function LandingPage({ onStart, onLogin }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const features = [
    { title: "Universitet va grantlarni qidirish", desc: "Dunyodagi eng yaxshi oliygohlar va ularning talablari haqida batafsil ma'lumotlar." },
    { title: "Shaxsiy reja va checklist yaratish", desc: "Sizning tayyorgarlik darajangizga moslangan amaliy vazifalar ro'yxati." },
    { title: "Foydali imkoniyatlarni kuzatish", desc: "Akademik CV ni kuchaytirish uchun almashinuv, tanlovlar va oromgohlar." },
    { title: "Mentorlar va maslahatchilar bilan bog‘lanish", desc: "Xalqaro loyihalarda muvaffaqiyat qozongan talabalar bilan muloqot." },
    { title: "AI yordamchi oqrali savollarga javob olish", desc: "Hujjatlar tayyorlash va grantlar haqida 24/7 aqlli maslahatlar." }
  ];

  return (
    <div className="relative bg-slate-50 min-h-screen overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none -translate-x-1/3" />

      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/75 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mr-3 shadow-sm shadow-blue-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">UApply</span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={onLogin} className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2 rounded-xl transition-all">
              Kirish (Demo)
            </button>
            <button onClick={onStart} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </header>

      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <motion.div variants={itemVariants} className="flex">
              <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-blue-50 border border-blue-200/50 text-blue-700 text-xs font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Xalqaro ta’lim platformasi
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Xalqaro universitetlarga yo‘lingizni <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UApply</span> bilan boshlang
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              UApply sizga universitet tanlash, grantlarni topish, hujjatlar tayyorlash va ariza topshirish jarayonini bir joyda boshqarishga yordam beradi.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                Boshlash 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onLogin} className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-sm flex items-center justify-center">
                Demo hisob bilan kirish
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 pt-6 border-t border-slate-200/60">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Platforma imkoniyatlari</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feat, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-tight">{feat.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 relative w-full h-[560px] md:h-[600px] flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-0 w-[240px] sm:w-[260px] bg-white rounded-3xl shadow-xl border border-slate-100/80 overflow-hidden z-20"
            >
              <div className="h-28 relative">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxW8h0KZA4wxryJ5l322nZ6mmHVoljOcsKQ&s" alt="MIT" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-bold text-white bg-blue-600 px-2.5 py-1 rounded-lg">
                  95% Moslik
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Amerika Qo'shma Shtatlari</h4>
                <p className="text-sm font-bold text-slate-950 mt-1 truncate">Massachusetts Institute of Technology</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50 text-xs text-slate-500">
                  <span>Ranking: <strong className="text-slate-800">QS #1</strong></span>
                  <span className="text-amber-600 font-bold">1-Yanvar</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/3 right-0 w-[200px] sm:w-[220px] bg-slate-900 text-white rounded-3xl shadow-2xl p-4 z-30"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-extrabold text-blue-400 tracking-wide uppercase">UApply AI</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                "GKS granti uchun ariza topshirish muddati yaqinlashmoqda. Reja bo'yicha hujjatlarni tayyorlashni unutmang!"
              </p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 left-2 w-[220px] sm:w-[240px] bg-white rounded-3xl shadow-xl border border-slate-100/80 p-4 z-20"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" /> Shaxsiy reja
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">65%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs text-slate-400 line-through truncate">IELTS / SAT sertifikatlari</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  </div>
                  <span className="text-xs text-slate-700 font-medium truncate">Motivation Letter yozish</span>
                </div>
                <div className="flex items-center gap-2">
                  <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  <span className="text-xs text-slate-600 truncate">Tavsiyanoma so'rash</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-4 right-2 w-[180px] bg-gradient-to-br from-emerald-50 to-white rounded-3xl shadow-lg border border-emerald-100 p-4 z-20"
            >
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">Global Korea Scholarship</h4>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100 text-[10px]">
                <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">To'liq (100%)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Onboarding({ onComplete, onCancel }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ 
    name: '', 
    grade: '', 
    major: '', 
    countries: [], 
    english: '', 
    hasSat: null, 
    satScore: '' 
  });

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleSkipEnglish = () => {
    setData(prev => ({ ...prev, english: 'Yo‘q' }));
    setStep(6);
  };

  const selectCountry = (country) => {
    setData(prev => {
      const isSelected = prev.countries.includes(country);
      const newCountries = isSelected 
        ? prev.countries.filter(c => c !== country) 
        : [...prev.countries, country];
      return { ...prev, countries: newCountries };
    });
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return data.name.trim().length >= 2;
      case 2: return data.grade !== '';
      case 3: return data.major !== '';
      case 4: return data.countries.length > 0;
      case 5: return data.english !== '';
      case 6: 
        if (data.hasSat === null) return false;
        if (data.hasSat === false) return true;
        if (data.hasSat === true) {
          const val = parseInt(data.satScore, 10);
          return !isNaN(val) && val >= 400 && val <= 1600;
        }
        return false;
      default: return false;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col pt-20">
      <div className="max-w-2xl mx-auto w-full px-6 flex-1 flex flex-col relative">
        <button onClick={onCancel} className="absolute top-0 right-6 p-2 text-slate-400 hover:bg-slate-200 rounded-full">
          <X className="w-6 h-6" />
        </button>

        <div className="w-full h-2 bg-slate-200 rounded-full mb-10 overflow-hidden mt-8">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: `${((step - 1) / 6) * 100}%` }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wider">Bosqich {step} / 6</div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Ismingiz nima?</h2>
                  <p className="text-slate-500 mb-8 text-sm">Biz sizga to'g'ri murojaat qilishimiz uchun ismingizni kiriting.</p>
                  <input 
                    type="text" autoFocus
                    className="w-full text-2xl p-4 border-b-2 border-slate-200 focus:border-blue-600 focus:outline-none bg-transparent"
                    placeholder="Ismingizni kiriting..."
                    value={data.name} onChange={(e) => setData({...data, name: e.target.value})}
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Hozir nechanchi sinfda o‘qiyapsiz?</h2>
                  <p className="text-slate-500 mb-8 text-sm">Shaxsiy rejangizni o'quv yilingizga moslaymiz.</p>
                  <div className="grid gap-4">
                    {['9-sinf', '10-sinf', '11-sinf'].map(grade => (
                      <button 
                        key={grade} onClick={() => setData({...data, grade})}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${data.grade === grade ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                        <span className="font-bold text-lg text-slate-800">{grade}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Qaysi yo‘nalishga qiziqasiz?</h2>
                  <p className="text-slate-500 mb-6 text-sm">Tavsiyalar va darslarni ushbu sohaga muvofiqlashtiramiz.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MAJORS.map(major => (
                      <button 
                        key={major} onClick={() => setData({...data, major})}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${data.major === major ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                        <span className="font-bold text-sm text-slate-800">{major}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Qaysi davlatlarda o‘qishni xohlaysiz?</h2>
                  <p className="text-slate-500 mb-6 text-sm">Universitet va grantlarni ushbu davlatlar bo'yicha birinchi bo'lib tavsiya qilamiz.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['AQSh', 'Buyuk Britaniya', 'Germaniya', 'Turkiya', 'Janubiy Koreya', 'Yaponiya', 'Kanada'].map(country => {
                      const isSelected = data.countries.includes(country);
                      return (
                        <button 
                          key={country} onClick={() => selectCountry(country)}
                          className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                          <span className="font-bold text-slate-800">{country}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">IELTS / ingliz tili darajangiz bormi?</h2>
                  <p className="text-slate-500 mb-6 text-sm">Ingliz tili darajangiz mos keladigan grant va talablarni saralashga yordam beradi.</p>
                  <div className="grid gap-3">
                    {[
                      { key: 'Yo‘q', label: 'Yo‘q (Hozircha til sertifikatim yo‘q)' },
                      { key: 'A1–A2 (IELTS 0–4)', label: 'A1–A2 (IELTS 0–4.0 / Beginner)' },
                      { key: 'B1–B2 (IELTS 4.5–6.5)', label: 'B1–B2 (IELTS 4.5–6.5 / Intermediate)' },
                      { key: 'C1–C2 (IELTS 7+)', label: 'C1–C2 (IELTS 7.0+ / Advanced)' }
                    ].map(level => (
                      <button 
                        key={level.key} onClick={() => setData({...data, english: level.key})}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${data.english === level.key ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                        <span className="font-bold text-slate-800">{level.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button onClick={handleSkipEnglish} className="text-sm font-semibold text-slate-400 hover:text-blue-600 py-2 px-4">
                      O'tkazib yuborish →
                    </button>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">SAT topshirganmisiz?</h2>
                  <p className="text-slate-500 mb-6 text-sm">AQSh va nufuzli universitetlar uchun qo'shimcha imkoniyatlarni aniqlaymiz.</p>
                  <div className="flex gap-4 mb-6">
                    <button 
                      onClick={() => setData({ ...data, hasSat: false, satScore: '' })}
                      className={`flex-1 p-5 rounded-2xl border-2 text-center font-bold ${data.hasSat === false ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      Yo'q
                    </button>
                    <button 
                      onClick={() => setData({ ...data, hasSat: true })}
                      className={`flex-1 p-5 rounded-2xl border-2 text-center font-bold ${data.hasSat === true ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      Ha
                    </button>
                  </div>

                  <AnimatePresence>
                    {data.hasSat === true && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white p-5 rounded-2xl border border-slate-200"
                      >
                        <label className="block text-sm font-semibold text-slate-700 mb-2">SAT balingizni kiriting (400–1600)</label>
                        <input 
                          type="number" min="400" max="1600"
                          className="w-full text-xl p-3 border-2 border-slate-100 rounded-xl focus:border-blue-600 outline-none"
                          placeholder="Masalan: 1350"
                          value={data.satScore}
                          onChange={(e) => setData({ ...data, satScore: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="py-8">
          <button 
            disabled={!isStepValid()}
            onClick={handleNext}
            className={`w-full py-4 rounded-xl text-lg font-bold flex justify-center items-center transition-all ${
              isStepValid() ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:-translate-y-1' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>
              {step === 6 ? "Tugatish va Boshlash" : "Keyingisi"}
            </span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user, navigate, savedItems, toggleSave, setAiInitialPrompt, onEditProfile }) {
  const [savedTab, setSavedTab] = useState('universities');
  const [aiInput, setAiInput] = useState('');

  const initialTasks = useMemo(() => {
    const baseTasks = [
      { id: 't_uni', text: 'Kamida 1 ta mos universitetni tanlash va saqlash', done: savedItems.universities.length > 0 },
      { id: 't_prof', text: 'Profil ma’lumotlarini 100% to‘ldirish', done: false }
    ];

    if (user.english === 'Yo‘q') {
      baseTasks.push({ id: 't_ielts', text: 'IELTS so‘z boyligi (Vocabulary) darsini boshlash', done: false });
    } else {
      baseTasks.push({ id: 't_ielts', text: 'Bugungi IELTS Reading test amaliyotini yakunlash', done: false });
    }

    if (user.hasSat) {
      baseTasks.push({ id: 't_sat', text: 'SAT Math algebra qismidan test yechish', done: false });
    } else {
      baseTasks.push({ id: 't_sat', text: 'SAT topshirish rejasini va talablarini ko‘rib chiqish', done: false });
    }

    if (user.major === 'IT / Kompyuter fanlari') {
      baseTasks.push({ id: 't_major', text: 'LeetCode platformasida 1 ta sodda muammoni hal qilish', done: false });
    } else if (user.major === 'Biznes / Iqtisodiyot') {
      baseTasks.push({ id: 't_major', text: 'Harvard Business Review boshlang‘ich maqolasini o‘qish', done: false });
    } else {
      baseTasks.push({ id: 't_major', text: 'Tanlangan soha bo‘yicha amaliy darsni tomosha qilish', done: false });
    }

    return baseTasks;
  }, [user, savedItems]);

  const [tasks, setTasks] = useState(() => {
    const cached = storage.get(`uapply_tasks_${user.name}`);
    return cached || initialTasks;
  });

  useEffect(() => {
    setTasks(prev => {
      const merged = prev.map(t => {
        if (t.id === 't_uni') return { ...t, done: savedItems.universities.length > 0 };
        return t;
      });
      storage.set(`uapply_tasks_${user.name}`, merged);
      return merged;
    });
  }, [savedItems, user.name]);

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);
    storage.set(`uapply_tasks_${user.name}`, updated);
  };

  const stats = useMemo(() => {
    const profileCompleteness = Math.round(
      (user.name ? 20 : 0) +
      (user.grade ? 20 : 0) +
      (user.major ? 20 : 0) +
      (user.countries && user.countries.length > 0 ? 20 : 0) +
      (user.english ? 20 : 0)
    );

    const ieltsProgress = user.english === 'C1–C2 (IELTS 7+)' ? 95
      : user.english === 'B1–B2 (IELTS 4.5–6.5)' ? 70
      : user.english === 'A1–A2 (IELTS 0–4)' ? 45 : 15;

    const satProgress = user.hasSat ? 85 : 30;

    const docProgress = Math.round((tasks.filter(t => t.done).length / tasks.length) * 100);

    const overallProgress = Math.round(
      (profileCompleteness * 0.25) +
      (ieltsProgress * 0.3) +
      (satProgress * 0.25) +
      (docProgress * 0.2)
    );

    return {
      profileCompleteness,
      ieltsProgress,
      satProgress,
      docProgress,
      overallProgress
    };
  }, [user, tasks]);

  const handleOpenAiChat = () => {
    setAiInitialPrompt(aiInput || 'Assalomu alaykum! Menga mos universitetlarni qanday topsam bo‘ladi?');
    navigate('community');
  };

  const matchedUniversities = useMemo(() => {
    return enrichedUniversitiesData
      .map(uni => ({ ...uni, calculatedMatch: getCustomMatchScore(uni, user) }))
      .sort((a, b) => b.calculatedMatch - a.calculatedMatch)
      .slice(0, 4);
  }, [user]);

  const matchedGrants = useMemo(() => {
    return scholarshipsData
      .map(g => ({ ...g, calculatedMatch: getCustomMatchScore(g, user) }))
      .sort((a, b) => b.calculatedMatch - a.calculatedMatch)
      .slice(0, 3);
  }, [user]);

  const deadlineItems = useMemo(() => {
    const list = [];
    matchedUniversities.forEach(u => {
      list.push({ type: 'Universitet', name: u.name, deadline: u.deadline });
    });
    matchedGrants.forEach(g => {
      list.push({ type: 'Grant', name: g.name, deadline: g.deadline });
    });
    return list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 4);
  }, [matchedUniversities, matchedGrants]);

  const getUrgencyClass = (deadlineStr) => {
    const diffTime = new Date(deadlineStr) - new Date('2026-05-29');
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 5) return { text: `${diffDays} kun qoldi`, badge: 'bg-red-50 text-red-600 border border-red-100 animate-pulse' };
    if (diffDays <= 14) return { text: '1 hafta qoldi', badge: 'bg-amber-50 text-amber-600 border border-amber-100' };
    return { text: 'Yaqinda', badge: 'bg-blue-50 text-blue-600 border border-blue-100' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dynamic Greetings Card */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Salom, {user.name}! 👋</h1>
            <p className="text-slate-300 max-w-xl">UApply ishchi muhitiga xush kelibsiz. Quyida sizning anketangizga moslashtirilgan shaxsiy o‘quv rejasi va nufuzli universitetlar joylashgan.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10">🎓 {user.grade}</span>
              <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10">💻 {user.major}</span>
              <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10">🌐 {user.countries?.join(', ')}</span>
            </div>
          </div>
          <button onClick={onEditProfile} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
            Anketani o‘zgartirish <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Grid of workspace layout */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Main 2-column workspace section */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PERSONAL PROGRESS SNAPSHOT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">Tayyorlik darajangiz</h2>
              <span className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1 rounded-lg">Umumiy: {stats.overallProgress}%</span>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.overallProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" /> IELTS tayyorligi
                  </span>
                  <span className="text-xs font-bold text-slate-950">{stats.ieltsProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${stats.ieltsProgress}%` }} />
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-600" /> SAT tayyorligi
                  </span>
                  <span className="text-xs font-bold text-slate-950">{stats.satProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600" style={{ width: `${stats.satProgress}%` }} />
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" /> Hujjatlar
                  </span>
                  <span className="text-xs font-bold text-slate-950">{stats.docProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: `${stats.docProgress}%` }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* DYNAMIC TASKS AND DEADLINES TRACKER */}
          <div className="grid sm:grid-cols-2 gap-8">
            
            {/* TODAY'S TASKS SECTION */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Bugungi vazifalar
                </h3>
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-start p-3 rounded-xl border transition-all cursor-pointer ${task.done ? 'bg-slate-50/50 border-transparent opacity-85' : 'bg-white border-slate-100 hover:border-blue-200'}`}
                    >
                      <button className="mr-3 mt-0.5 pointer-events-none">
                        {task.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 text-slate-300 shrink-0" />}
                      </button>
                      <span className={`text-sm leading-tight select-none pointer-events-none ${task.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 italic">Vazifalarni bajarib umumiy tayyorlik progressini oshiring.</p>
            </motion.div>

            {/* DEADLINE TRACKER */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" /> Yaqin deadline’lar
                </h3>
                <div className="space-y-3">
                  {deadlineItems.map((item, idx) => {
                    const urgency = getUrgencyClass(item.deadline);
                    return (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="min-w-0 flex-1 pr-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">{item.type}</p>
                          <p className="text-sm font-bold text-slate-900 truncate mt-1">{item.name}</p>
                        </div>
                        <span className={`text-xs font-semibold py-1 px-2.5 rounded-lg shrink-0 ${urgency.badge}`}>
                          {urgency.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={() => navigate('universities')} className="w-full text-center mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 py-1 flex items-center justify-center gap-1 border-t border-slate-50 pt-3">
                Universitet muddatlarini ko‘rish <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          

          {/* SAVED ITEMS SECTION */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" /> Saqlanganlar
              </h2>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {['universities', 'grants', 'opportunities'].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setSavedTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${savedTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {tab === 'universities' ? 'Universitetlar' : tab === 'grants' ? 'Grantlar' : 'Imkoniyatlar'}
                  </button>
                ))}
              </div>
            </div>

            {/* Universitetlar tab */}
            {savedTab === 'universities' && (
              <div className="space-y-3">
                {savedItems.universities.length === 0 ? (
                  <p className="text-sm text-slate-400 italic py-4 text-center">Saqlangan universitetlar yo‘q. Universitetlar bo‘limidan ularni qo‘shing.</p>
                ) : (
                  enrichedUniversitiesData.filter(u => savedItems.universities.includes(u.id)).map(uni => (
                    <div key={uni.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex items-center space-x-3 min-w-0">
                        <img src={uni.image} alt="" className="w-10 h-10 object-cover rounded-xl shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{uni.name}</p>
                          <p className="text-xs text-slate-400">{uni.country} • {uni.tuition}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleSave('universities', uni.id)} className="text-slate-400 hover:text-red-500 p-2 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Grantlar tab */}
            {savedTab === 'grants' && (
              <div className="space-y-3">
                {savedItems.grants.length === 0 ? (
                  <p className="text-sm text-slate-400 italic py-4 text-center">Saqlangan grantlar yo‘q. Grantlar bo‘limidan ularni qo‘shing.</p>
                ) : (
                  scholarshipsData.filter(g => savedItems.grants.includes(g.id)).map(grant => (
                    <div key={grant.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 truncate">{grant.name}</p>
                        <p className="text-xs text-slate-400">{grant.country} • {grant.type} Grant</p>
                      </div>
                      <button onClick={() => toggleSave('grants', grant.id)} className="text-slate-400 hover:text-red-500 p-2 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Imkoniyatlar tab */}
            {savedTab === 'opportunities' && (
              <div className="space-y-3">
                {savedItems.opportunities.length === 0 ? (
                  <p className="text-sm text-slate-400 italic py-4 text-center">Saqlangan imkoniyatlar yo‘q. Imkoniyatlar bo‘limidan ularni saqlang.</p>
                ) : (
                  opportunitiesData.filter(o => savedItems.opportunities.includes(o.id)).map(opp => (
                    <div key={opp.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{opp.title}</p>
                        <p className="text-xs text-slate-400">{opp.organization} • {opp.category}</p>
                      </div>
                      <button onClick={() => toggleSave('opportunities', opp.id)} className="text-slate-400 hover:text-red-500 p-2 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right workspace sidebar panel */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
          
          {/* AI HELP DESK CARD */}
          <motion.div variants={fadeUp} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 border border-blue-200/50 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-950 leading-none">AI Konsultant</h3>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Virtual Mentor</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">Kelajakdagi yo'nalishlar, grant dasturlari va insho talablari bo'yicha darhol javob oling.</p>
            <div className="bg-white rounded-xl border border-slate-200/60 p-1 flex items-center">
              <input type="text" placeholder="Savolingiz..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} className="flex-1 bg-transparent px-3 py-1.5 text-xs outline-none text-slate-800" />
              <button onClick={handleOpenAiChat} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"><Send className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>

          {/* ANNOUNCEMENTS SECTION */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" /> So‘nggi e’lonlar
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-2xl border-l-4 border-amber-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold text-amber-600 uppercase">Yangi grant</span>
                  <span className="text-[10px] text-slate-400">Yaqinda</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">El-Yurt Umidi Jamg‘armasi (EYUF) yangi dasturini e’lon qildi</h4>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase">Yangilanish</span>
                  <span className="text-[10px] text-slate-400">Kecha</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">Platformada SAT Math bo‘limiga doir yangi interaktiv qo‘llanmalar yuklandi</h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function UniversitiesPage({ user, savedItems, toggleSave }) {
  const [search, setSearch] = useState('');
  const [filterCountry, setFilterCountry] = useState('Barchasi');
  const [filterMajor, setFilterMajor] = useState('Barchasi');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUni, setSelectedUni] = useState(null);
  React.useEffect(() => {
    if (selectedUni) {
      window.scrollTo(0, 0); // Oyna skrolini eng tepaga qaytaradi
    }
  }, [selectedUni]);

  const handleResetFilters = () => {
    setSearch('');
    setFilterCountry('Barchasi');
    setFilterMajor('Barchasi');
  };
  
  const filteredData = useMemo(() => {
    const list = enrichedUniversitiesData.filter(uni => {
      const matchSearch = uni.name.toLowerCase().includes(search.toLowerCase()) || uni.major.toLowerCase().includes(search.toLowerCase());
      const matchCountry = filterCountry === 'Barchasi' || uni.country === filterCountry;
      const matchMajor = filterMajor === 'Barchasi' || uni.major === filterMajor;
      return matchSearch && matchCountry && matchMajor;
    });
    return list.sort((a, b) => a.ranking - b.ranking);
  }, [search, filterCountry, filterMajor]);

  if (selectedUni) {
    return (
      <UniversityDetailsPage 
        uni={selectedUni} 
        user={user} 
        onBack={() => setSelectedUni(null)} 
        savedItems={savedItems} 
        toggleSave={toggleSave} 
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Universitetlar</h1>
          <p className="text-slate-600">Jahon reytingi bo‘yicha (QS Ranking) saralangan nufuzli oliygohlar</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" placeholder="Universitet nomini yozing" 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filterlar
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }} 
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Davlat</label>
                <select 
                  value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-600 outline-none font-medium text-slate-700"
                >
                  <option value="Barchasi">Barcha davlatlar</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Yo'nalish</label>
                <select 
                  value={filterMajor} onChange={(e) => setFilterMajor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-600 outline-none font-medium text-slate-700"
                >
                  <option value="Barchasi">Barcha yo'nalishlar</option>
                  {Array.from(new Set(enrichedUniversitiesData.map(u => u.major))).map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              {/* Reset Button */}
              <div className="flex items-end">
                <button 
                  onClick={handleResetFilters}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 border border-slate-200"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredData.map(uni => {
            const isSaved = savedItems.universities.includes(uni.id);
            return (
              <motion.div 
                key={uni.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.25 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between group relative transition-all duration-500"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSave('universities', uni.id); }}
                  className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full transition-colors z-10 shadow-sm ${isSaved ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <div className="h-44 overflow-hidden relative cursor-pointer" onClick={() => setSelectedUni(uni)}>
                  <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded-md mb-2 inline-block">
                      QS Rank #{uni.ranking}
                    </span>
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{uni.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => setSelectedUni(uni)}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold text-slate-500 flex items-center bg-slate-50 px-2 py-1 rounded-lg">
                        <MapPin className="w-3 h-3 mr-1" /> {uni.country}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <p className="text-slate-400 mb-0.5">Kontrakt</p>
                        <p className="font-bold text-slate-800 truncate">{uni.tuition.split('/')[0]}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <p className="text-slate-400 mb-0.5">Muddat</p>
                        <p className="font-bold text-slate-800 truncate">{uni.deadline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 w-full">
                    <button className="w-full py-2.5 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-xl text-sm group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    Batafsil ko'rish <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UniversityDetailsPage({ uni, user, onBack, savedItems, toggleSave }) {
  const matchPercent = getCustomMatchScore(uni, user);
  const isSaved = savedItems.universities.includes(uni.id);

  const calculateDaysLeft = (deadline) => {
    const diffTime = new Date(deadline) - new Date('2026-05-29');
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft(uni.deadline);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors group">
        <div className="bg-white shadow-sm p-1.5 rounded-lg border border-slate-200 mr-2 group-hover:border-blue-200 group-hover:bg-blue-50">
          <ArrowLeft className="w-4 h-4" />
        </div> Orqaga qaytish
      </button>

      <div className="relative rounded-[2rem] overflow-hidden mb-8 shadow-md">
        <div className="absolute inset-0 bg-slate-900">
          <img src={uni.image} alt={uni.name} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
        </div>
        <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-white flex-1">
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
              QS #{uni.ranking}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 leading-tight">{uni.name}</h1>
            <p className="text-blue-100 text-lg font-medium">{uni.major}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button onClick={() => toggleSave('universities', uni.id)} className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg ${isSaved ? 'bg-red-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}>
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} /> {isSaved ? 'Saqlangan' : 'Saqlash'}
            </button>
            <a href={uni.website_link} target="_blank" rel="noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg">
              Rasmiy sayt <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Book className="w-5 h-5 text-blue-600" /> Universitet haqida</h2>
            <p className="text-slate-600 leading-relaxed">{uni.overview}</p>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><FileCheck className="w-5 h-5 text-emerald-600" /> Qabul talablari</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">IELTS</p>
                <p className="text-2xl font-extrabold text-slate-900">{uni.IELTS_requirement}+</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">SAT</p>
                <p className="text-2xl font-extrabold text-slate-900">{uni.SAT_requirement}+</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">GPA</p>
                <p className="text-2xl font-extrabold text-slate-900">{uni.gpa_expectation}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-center gap-2"><Activity className="w-5 h-5 text-blue-600" /> Moslik ko'rsatkichi</h3>
            <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle cx="64" cy="64" r="56" stroke="#2563eb" strokeWidth="12" fill="transparent" strokeDasharray={2 * Math.PI * 56} strokeDashoffset={(2 * Math.PI * 56) - (matchPercent / 100) * (2 * Math.PI * 56)} />
              </svg>
              <span className="text-3xl font-extrabold text-slate-950">{matchPercent}%</span>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-600" /> Deadline</h3>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
              <p className="text-2xl font-extrabold text-slate-900 mb-1">{uni.deadline}</p>
              <p className="text-sm font-bold text-red-600">{daysLeft} kun qoldi</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function ScholarshipsPage({ user, savedItems, toggleSave }) {
  const [search, setSearch] = useState('');
  const [filterCountry, setFilterCountry] = useState('Barchasi');
  const [filterType, setFilterType] = useState('Barchasi');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  React.useEffect(() => {
    if (selectedScholarship) {
      window.scrollTo(0, 0);
    }
  }, [selectedScholarship]);

  const handleResetFilters = () => {
    setSearch('');
    setFilterCountry('Barchasi');
    setFilterType('Barchasi');
  };

  const personalizedScholarships = useMemo(() => {
    return scholarshipsData
      .map(g => ({
        ...g,
        matchScore: getScholarshipMatchScore(g, user)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [user]);

  const filteredScholarships = useMemo(() => {
    return scholarshipsData.filter(g => {
      const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.provider.toLowerCase().includes(search.toLowerCase());
      const matchCountry = filterCountry === 'Barchasi' || g.country === filterCountry;
      const matchType = filterType === 'Barchasi' || g.type === filterType;
      return matchSearch && matchCountry && matchType;
    });
  }, [search, filterCountry, filterType]);

  const countriesList = useMemo(() => {
    return ['Barchasi', ...new Set(scholarshipsData.map(g => g.country))];
  }, []);

  const getUrgencyIndicator = (deadlineStr) => {
    const diffTime = new Date(deadlineStr) - new Date('2026-05-29');
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return { emoji: "⚪", text: "Muddati o‘tdi", bg: "bg-slate-100 text-slate-500" };
    if (diffDays <= 3) return { emoji: "🔴", text: `${diffDays} kun qoldi`, bg: "bg-red-50 text-red-600 animate-pulse border border-red-200" };
    if (diffDays <= 7) return { emoji: "🟡", text: "1 hafta qoldi", bg: "bg-amber-50 text-amber-600 border border-amber-200" };
    return { emoji: "🟢", text: `${diffDays} kun qoldi`, bg: "bg-emerald-50 text-emerald-700" };
  };

  if (selectedScholarship) {
    return (
      <ScholarshipDetailsPage 
        grant={selectedScholarship}
        user={user}
        onBack={() => setSelectedScholarship(null)}
        savedItems={savedItems}
        toggleSave={toggleSave}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Grantlar & Stipendiyalar</h1>
          <p className="text-slate-600 mt-1">Dunyodagi eng nufuzli to‘liq va qisman moliyalashtiriladigan ta‘lim dasturlari hamda davlat grantlari.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Grant nomini yozing" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm bg-white"
            />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-5 py-3 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
              showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filterlar
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Dastur turi</label>
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-600 outline-none font-medium text-slate-700 appearance-none"
                >
                  <option value="Barchasi">Barchasi</option>
                  <option value="To‘liq">To‘liq grant (100% qoplash)</option>
                  <option value="Qisman">Qisman grant</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Davlat</label>
                <select 
                  value={filterCountry} 
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-600 outline-none font-medium text-slate-700 appearance-none"
                >
                  {countriesList.map(c => (
                    <option key={c} value={c}>{c === 'Barchasi' ? 'Barcha davlatlar' : c}</option>
                  ))}
                </select>
              </div>
              {/* Reset Button */}
              <div className="flex items-end">
                <button 
                  onClick={handleResetFilters}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 border border-slate-200"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 rounded-[2.5rem] p-6 sm:p-8 border border-blue-100">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" /> Siz uchun tavsiya etilgan grantlar
          </h2>
          <p className="text-xs text-slate-500 mt-1">Tanlagan mamlakatlaringiz, IELTS darajangiz va sinfingiz bo‘yicha mos keluvchi grant dasturlari.</p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-6">
          {personalizedScholarships.map(grant => (
            <div 
              key={grant.id}
              onClick={() => setSelectedScholarship(grant)}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {grant.matchScore}% Mos keladi
                  </span>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                    {grant.type} Grant
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm leading-tight line-clamp-1 mb-2">{grant.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{grant.overview}</p>
              </div>
              <div className="pt-4 w-full">
                <button className="w-full py-2.5 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-2xl text-xs group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Batafsil ko'rish <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Barcha grantlar</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredScholarships.map(grant => {
              const isSaved = savedItems.grants.includes(grant.id);
              const urgency = getUrgencyIndicator(grant.deadline);
              return (
                <motion.div 
                  key={grant.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.25 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group relative transition-all duration-300"
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleSave('grants', grant.id); }}
                    className={`absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full transition-colors z-10 shadow-sm ${
                      isSaved ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <div className="h-40 overflow-hidden relative cursor-pointer" onClick={() => setSelectedScholarship(grant)}>
                    <img src={grant.image} alt={grant.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider bg-blue-600 px-2 py-0.5 rounded-md mb-1.5 inline-block">
                        {grant.country}
                      </span>
                      <h4 className="font-bold text-base leading-tight line-clamp-1">{grant.name}</h4>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => setSelectedScholarship(grant)}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          grant.type === 'To‘liq' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {grant.type} Grant
                        </span>
                        
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${urgency.bg}`}>
                          <span>{urgency.emoji}</span> <span>{urgency.text}</span>
                        </span>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded-2xl">
                        <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Moliyaviy ko'lam:</p>
                        <p className="text-xs text-slate-800 font-bold mt-1.5 line-clamp-2">{grant.coverage}</p>
                      </div>
                    </div>

                    <div className="pt-4 w-full">
                      <button className="w-full py-2.5 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-2xl text-xs group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                      Batafsil ko'rish <ArrowRight className="w-4 h-4 ml-1.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ScholarshipDetailsPage({ grant, user, onBack, savedItems, toggleSave }) {
  const isSaved = savedItems.grants.includes(grant.id);
  const matchPercent = getScholarshipMatchScore(grant, user);
  const [successToast, setSuccessToast] = useState(false);

  const calculateDaysLeft = (deadline) => {
    const diffTime = new Date(deadline) - new Date('2026-05-29');
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft(grant.deadline);

  const handleAddToChecklist = () => {
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative"
    >
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm">Shaxsiy rejangiz yangilandi</p>
              <p className="text-xs text-slate-400">Ushbu grant topshiriqlar ro‘yxatiga muvaffaqiyatli qo‘shildi.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={onBack} className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors group">
        <div className="bg-white shadow-sm p-1.5 rounded-xl border border-slate-200 mr-2 group-hover:border-blue-200 group-hover:bg-blue-50">
          <ArrowLeft className="w-4 h-4" />
        </div> Barcha grantlarga qaytish
      </button>

      <div className="relative rounded-[2.5rem] overflow-hidden mb-8 shadow-md">
        <div className="absolute inset-0 bg-slate-900">
          <img src={grant.image} alt={grant.name} className="w-full h-full object-cover opacity-45 mix-blend-overlay" />
        </div>
        <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-white flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {grant.type} Grant
              </span>
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Tashkilot: {grant.provider}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none">{grant.name}</h1>
            <p className="text-blue-100 text-base font-medium max-w-2xl">{grant.country}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button 
              onClick={() => toggleSave('grants', grant.id)}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isSaved ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} /> {isSaved ? 'Saqlangan' : 'Saqlash'}
            </button>
            <a 
              href={grant.official_website} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              Rasmiy sayt <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
              <Book className="w-5 h-5 text-blue-600" /> Umumiy ma'lumot (Overview)
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{grant.overview}</p>
          </section>

          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
              <DollarSign className="w-5 h-5 text-emerald-600" /> Moliyaviy qoplov (Coverage)
            </h2>
            <p className="text-sm text-slate-600 font-medium mb-4">{grant.coverage}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">O‘qish shartnomasi (Tuition Fee)</h4>
                <p className="text-xs text-slate-500 mt-1">100% davlat yoki jamg‘arma tomonidan to‘liq moliyalashtiriladi.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Oylik stipendiya (Monthly Stipend)</h4>
                <p className="text-xs text-slate-500 mt-1">{grant.monthly_stipend || 'Moliyalashtirilgan oylik yashash kompensatsiyasi.'}</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
              <Users className="w-5 h-5 text-indigo-600" /> Ariza topshirish talablari (Eligibility)
            </h2>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 text-sm text-slate-700">
              <p className="leading-relaxed">{grant.eligibility}</p>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-gradient-to-b from-blue-50 to-white rounded-3xl p-6 border border-blue-100 shadow-sm text-center">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Profilingizga moslik
            </h3>
            <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 absolute">
                <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="64" cy="64" r="56" 
                  stroke="#10b981" strokeWidth="12" fill="transparent" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={(2 * Math.PI * 56) - ((matchPercent / 100) * (2 * Math.PI * 56))}
                />
              </svg>
              <span className="text-3xl font-extrabold text-slate-950">{matchPercent}%</span>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> Qabul muddati (Deadline)
            </h3>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
              <p className="text-2xl font-extrabold text-slate-900 mb-1">{grant.deadline}</p>
              <p className={`text-sm font-extrabold ${daysLeft < 30 ? 'text-red-600 animate-pulse' : 'text-emerald-600'}`}>
                {daysLeft} kun qoldi
              </p>
            </div>
          </section>

          <section className="bg-slate-900 rounded-[2rem] p-6 shadow-md text-white space-y-4">
            <h3 className="font-bold text-white leading-none">Vazifalar ro'yxati</h3>
            <p className="text-xs text-slate-300">Ushbu dasturni o‘zingizning boshqaruv paneli checklistiga topshiriq sifatida bog‘lang.</p>
            <button 
              onClick={handleAddToChecklist}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Checklistga qo'shish
            </button>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function OpportunitiesPage({ user, savedItems, toggleSave }) {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('Barchasi');
  const [filterLevel, setFilterLevel] = useState('Barchasi');
  const [filterField, setFilterField] = useState('Barchasi');
  React.useEffect(() => {
    if (selectedOpp) {
      window.scrollTo(0, 0);
    }
  }, [selectedOpp]);
  const handleResetFilters = () => {
    setFilterCategory('Barchasi');
    setFilterLevel('Barchasi');
    setFilterField('Barchasi');
  };

  const fieldsList = useMemo(() => {
    return ['Barchasi', ...new Set(opportunitiesData.map(o => o.field))];
  }, []);

  const filteredOpps = useMemo(() => {
    return opportunitiesData.filter(opp => {
      const catMatch = filterCategory === 'Barchasi' || opp.category === filterCategory;
      const lvlMatch = filterLevel === 'Barchasi' || opp.level === filterLevel;
      const fldMatch = filterField === 'Barchasi' || opp.field === filterField;
      return catMatch && lvlMatch && fldMatch;
    });
  }, [filterCategory, filterLevel, filterField]);

  const personalizedOpps = useMemo(() => {
    return opportunitiesData
      .map(opp => ({
        ...opp,
        matchScore: getOpportunityMatchScore(opp, user)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [user]);

  if (selectedOpp) {
    return (
      <OpportunityDetailsPage 
        opp={selectedOpp} 
        user={user} 
        onBack={() => setSelectedOpp(null)}
        savedItems={savedItems}
        toggleSave={toggleSave}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Qo'shimcha Imkoniyatlar</h1>
          <p className="text-slate-600 mt-1">CV ni boyitish, tajriba orttirish va universitet arizalarini kuchaytirish uchun darsdan tashqari loyihalar.</p>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`px-5 py-3 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
            showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filterlar paneli
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm grid sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Turkum</label>
                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-600 outline-none font-medium text-slate-700 appearance-none"
                >
                  <option value="Barchasi">Barcha turkumlar</option>
                  <option value="Tanlovlar">Tanlovlar</option>
                  <option value="Ilmiy tadqiqotlar">Ilmiy tadqiqotlar</option>
                  <option value="Volontyorlik">Volontyorlik</option>
                  <option value="Onlayn kurslar">Onlayn kurslar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Daraja</label>
                <select 
                  value={filterLevel} 
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-600 outline-none font-medium text-slate-700 appearance-none"
                >
                  <option value="Barchasi">Barcha darajalar</option>
                  <option value="Milliy">Milliy</option>
                  <option value="Xalqaro">Xalqaro</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Soha (Field)</label>
                <select 
                  value={filterField} 
                  onChange={(e) => setFilterField(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-600 outline-none font-medium text-slate-700 appearance-none"
                >
                  {fieldsList.map(field => (
                    <option key={field} value={field}>{field === 'Barchasi' ? 'Barcha sohalar' : field}</option>
                  ))}
                </select>
              </div>
              {/* Reset Button */}
              <div className="flex items-end">
                <button 
                  onClick={handleResetFilters}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 border border-slate-200"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent rounded-[2.5rem] p-6 sm:p-8 border border-blue-100">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" /> Siz uchun tavsiya etilgan imkoniyatlar
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {personalizedOpps.map(opp => (
            <div 
              key={opp.id} 
              onClick={() => setSelectedOpp(opp)}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {opp.matchScore}% Moslik
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                    opp.impact === 'Academic' ? 'bg-indigo-50 text-indigo-700' :
                    opp.impact === 'Leadership' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {opp.impact}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm leading-tight mb-2 line-clamp-1">{opp.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{opp.overview}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{opp.category}</span>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">Ko'rish <ChevronRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Barcha imkoniyatlar ro'yxati ({filteredOpps.length})</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredOpps.map(opp => {
              const isSaved = savedItems.opportunities.includes(opp.id);
              return (
                <motion.div 
                  key={opp.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.25 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group relative transition-all duration-300"
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleSave('opportunities', opp.id); }}
                    className={`absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full transition-colors z-10 shadow-sm ${
                      isSaved ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <div className="h-40 overflow-hidden relative cursor-pointer" onClick={() => setSelectedOpp(opp)}>
                    <img src={opp.image} alt={opp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h4 className="font-bold text-base leading-tight line-clamp-1">{opp.title}</h4>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => setSelectedOpp(opp)}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {opp.category}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Tashkilot:</span>
                          <span className="font-bold text-slate-700 truncate max-w-[140px]">{opp.organization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Muddat:</span>
                          <span className="font-bold text-amber-600">{opp.deadline}</span>
                        </div>
                      </div>
                    </div>

                   <div className="pt-4 w-full">
                    <button className="w-full py-2.5 bg-transparent border border-blue-600 text-blue-600 font-bold rounded-2xl text-xs group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    Batafsil ko'rish <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OpportunityDetailsPage({ opp, user, onBack, savedItems, toggleSave }) {
  const isSaved = savedItems.opportunities.includes(opp.id);
  const matchPercent = getOpportunityMatchScore(opp, user);
  const [successToast, setSuccessToast] = useState(false);

  const calculateDaysLeft = (deadline) => {
    if (deadline === 'Ochiq qabul') return 365;
    const diffTime = new Date(deadline) - new Date('2026-05-29');
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft(opp.deadline);

  const handleAddToChecklist = () => {
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative"
    >
      
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm">Shaxsiy reja yangilandi</p>
              <p className="text-xs text-slate-400">Imkoniyat topshiriqlar ro'yxatiga muvaffaqiyatli qo'shildi.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={onBack} className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors group">
        <div className="bg-white shadow-sm p-1.5 rounded-xl border border-slate-200 mr-2 group-hover:border-blue-200 group-hover:bg-blue-50">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Barcha imkoniyatlarga qaytish
      </button>

      <div className="relative rounded-[2.5rem] overflow-hidden mb-8 shadow-md">
        <div className="absolute inset-0 bg-slate-900">
          <img src={opp.image} alt={opp.title} className="w-full h-full object-cover opacity-45 mix-blend-overlay" />
        </div>
        <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-white flex-1 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none">{opp.title}</h1>
            <p className="text-blue-100 text-base font-medium max-w-2xl">{opp.organization}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button 
              onClick={() => toggleSave('opportunities', opp.id)}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isSaved ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} /> {isSaved ? 'Saqlangan' : 'Saqlash'}
            </button>
            <a 
              href={opp.application_link} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              Ariza topshirish <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
              <Book className="w-5 h-5 text-blue-600" /> Umumiy ma‘lumot
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{opp.overview}</p>
          </section>

          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
              <Users className="w-5 h-5 text-indigo-600" /> Nomzodlik talablari (Eligibility)
            </h2>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p>{opp.eligibility}</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-3">
              <Award className="w-5 h-5 text-emerald-600" /> Dastur afzalliklari va benefits
            </h2>
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-emerald-900 text-sm leading-relaxed">
              {opp.benefits}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          
          <section className="bg-gradient-to-b from-blue-50 to-white rounded-3xl p-6 border border-blue-100 shadow-sm text-center">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Profilga moslik darajasi
            </h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <motion.circle 
                  cx="64" cy="64" r="56" 
                  stroke="#10b981" strokeWidth="12" fill="transparent" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 56}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  animate={{ strokeDashoffset: (2 * Math.PI * 56) - ((matchPercent / 100) * (2 * Math.PI * 56)) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900">{matchPercent}%</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> Arizalar qabul qilish muddati
            </h3>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
              <p className="text-2xl font-extrabold text-slate-900 mb-1">{opp.deadline}</p>
              
              {opp.deadline !== 'Ochiq qabul' && (
                <>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                     <motion.div 
                       className={`h-full ${daysLeft < 15 ? 'bg-red-500' : daysLeft < 45 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                       initial={{ width: 0 }}
                       animate={{ width: `${Math.min(100, (daysLeft / 365) * 100)}%` }}
                       transition={{ duration: 1 }}
                     />
                  </div>
                  <p className={`text-sm font-extrabold ${daysLeft < 15 ? 'text-red-600' : daysLeft < 45 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {daysLeft} kun qoldi
                  </p>
                </>
              )}
            </div>
          </section>

          <section className="bg-slate-900 rounded-[2rem] p-6 shadow-md text-white space-y-4">
            <h3 className="font-bold text-white leading-none">Vazifalar ro'yxati</h3>
            <p className="text-xs text-slate-300">Ushbu dasturni o'z shaxsiy rejangizga bog'lang.</p>
            <button 
              onClick={handleAddToChecklist}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Checklistga qo'shish
            </button>
          </section>

        </div>
      </div>
    </motion.div>
  );
}

function LessonCard({ lesson, progressData, onClick }) {
  const status = progressData?.status || 'not_started';
  const progressPercent = progressData?.progressPercent || 0;

  return (
    <motion.div 
      layout
      onClick={() => onClick(lesson)}
      // Og'ir yuklamalarni oldini olish uchun faqat toza fade-in rejimiga o'tkazildi
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={lesson.thumbnail} 
          alt={lesson.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <Play className="w-6 h-6 ml-1 fill-current" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur text-slate-800 shadow-sm">
            {lesson.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 font-medium">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lesson.duration}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><BarChart className="w-3.5 h-3.5" /> {lesson.difficulty}</span>
        </div>
        
        <h3 className="font-extrabold text-slate-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {lesson.title}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow">
          {lesson.short_description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50">
          {status === 'not_started' ? (
            <button className="text-sm font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
              Ko'rish <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span className={status === 'completed' ? 'text-emerald-600' : 'text-blue-600'}>
                  {status === 'completed' ? 'Tugallandi' : 'Davom ettirish'}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  className={`h-full rounded-full ${status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function LessonPlayerView({ lesson, allLessons, onBack, progressData, updateProgress, userNotes, updateNotes, onOpenLesson }) {
  const [activeTab, setActiveTab] = useState('about');
  const [noteText, setNoteText] = useState(userNotes || '');

  useEffect(() => {
    if (!progressData || progressData.status === 'not_started') {
      updateProgress(lesson.id, { status: 'started', progressPercent: 15 });
    }
    setNoteText(userNotes || '');
  }, [lesson.id]);

  const handleSaveNote = () => {
    updateNotes(lesson.id, noteText);
  };

  const toggleCompletion = () => {
    const isCompleted = progressData?.status === 'completed';
    updateProgress(lesson.id, { 
      status: isCompleted ? 'started' : 'completed', 
      progressPercent: isCompleted ? 50 : 100 
    });
  };

  const relatedLessons = allLessons
    .filter(l => l.category === lesson.category && l.id !== lesson.id)
    .slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <button onClick={onBack} className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors group">
        <div className="bg-white shadow-sm p-1.5 rounded-xl border border-slate-200 mr-2 group-hover:border-blue-200 group-hover:bg-blue-50">
          <ArrowLeft className="w-4 h-4" />
        </div> Darslarga qaytish
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="w-full bg-slate-900 rounded-3xl overflow-hidden shadow-xl aspect-video relative border border-slate-800">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src={lesson.youtube_link} 
              title={lesson.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">{lesson.category}</span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md"><Clock className="w-3 h-3" /> {lesson.duration}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">{lesson.title}</h1>
              <p className="text-slate-500 text-sm flex items-center gap-2 font-medium">
                <MonitorPlay className="w-4 h-4" /> Ustoz: <span className="font-bold text-slate-700">{lesson.instructor}</span>
              </p>
            </div>
            
            <button 
              onClick={toggleCompletion}
              className={`shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-all shadow-sm w-full sm:w-auto ${
                progressData?.status === 'completed' 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              {progressData?.status === 'completed' ? 'Tugallangan' : 'Tugallandi deb belgilash'}
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('about')}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Dars haqida
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-4 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Mening qaydlarim <Bookmark className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8">
              {activeTab === 'about' ? (
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Bu darsda nimalarni o'rganasiz?</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium">{lesson.short_description}</p>
                  <div className="flex flex-wrap gap-2">
                    {lesson.tags.map(tag => (
                      <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full animate-fade-in-up">
                  <p className="text-sm font-bold text-slate-600 mb-3">Dars davomida o'zingiz uchun muhim qaydlarni saqlab boring:</p>
                  <textarea 
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Qaydlarni bu yerga yozing..."
                    className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none mb-4 font-medium text-slate-700 leading-relaxed"
                  />
                  <button 
                    onClick={handleSaveNote}
                    className="self-end px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2"
                  >
                    <Bookmark className="w-4 h-4" /> Saqlash
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">Maslahat</h3>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Darsni to'liq ko'rib chiqqandan so'ng "Tugallandi deb belgilash" tugmasini bosishni unutmang. Bu sizning umumiy tayyorgarlik progressini oshiradi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> O'xshash darslar
            </h3>
            <div className="space-y-4">
              {relatedLessons.length > 0 ? relatedLessons.map(relLesson => (
                <div 
                  key={relLesson.id} 
                  onClick={() => onOpenLesson(relLesson)}
                  className="flex gap-4 group cursor-pointer p-2 -mx-2 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 relative shadow-sm">
                    <img src={relLesson.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 transition-colors leading-tight mb-1">
                      {relLesson.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{relLesson.duration}</span>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500 text-center py-4 italic">Boshqa darslar topilmadi</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LessonsPage({ user }) {
  const [activeView, setActiveView] = useState('hub');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const [progressData, setProgressData] = useState(() => storage.get('uapply_lessons_progress') || {});
  const [notesData, setNotesData] = useState(() => storage.get('uapply_lessons_notes') || {});

  useEffect(() => {
    storage.set('uapply_lessons_progress', progressData);
  }, [progressData]);

  useEffect(() => {
    storage.set('uapply_lessons_notes', notesData);
  }, [notesData]);

  const updateProgress = (lessonId, data) => {
    setProgressData(prev => ({ ...prev, [lessonId]: data }));
  };

  const updateNotes = (lessonId, note) => {
    setNotesData(prev => ({ ...prev, [lessonId]: note }));
  };

  const handleOpenLesson = (lesson) => {
    setSelectedLesson(lesson);
    setActiveView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['Barchasi', ...new Set(lessonsData.map(l => l.category))];

  const filteredLessons = useMemo(() => {
    return lessonsData.filter(l => {
      const matchCat = activeCategory === 'Barchasi' || l.category === activeCategory;
      const matchSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.short_description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const recommendedLessons = useMemo(() => {
    let recs = new Set();
    if (user?.countries?.includes('AQSh')) lessonsData.filter(l => l.tags.includes('USA')).forEach(l => recs.add(l));
    if (user?.countries?.includes('Buyuk Britaniya')) lessonsData.filter(l => l.tags.includes('UK')).forEach(l => recs.add(l));
    if (user?.english === 'A1–A2 (IELTS 0–4)' || user?.english === 'Yo‘q') lessonsData.filter(l => l.tags.includes('IELTS')).forEach(l => recs.add(l));
    lessonsData.filter(l => l.recommendedFor.includes('All')).forEach(l => recs.add(l));
    return Array.from(recs).slice(0, 3);
  }, [user]);

  const inProgressLessons = lessonsData.filter(l => progressData[l.id]?.status === 'started');
  const completedCount = Object.values(progressData).filter(p => p.status === 'completed').length;

  if (activeView === 'player' && selectedLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LessonPlayerView 
          lesson={selectedLesson} 
          allLessons={lessonsData}
          onBack={() => setActiveView('hub')}
          progressData={progressData[selectedLesson.id]}
          updateProgress={updateProgress}
          userNotes={notesData[selectedLesson.id]}
          updateNotes={updateNotes}
          onOpenLesson={handleOpenLesson}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">O'quv Markazi</h1>
            {completedCount > 0 && (
              <span className="hidden sm:flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold border border-amber-200">
                <Award className="w-3.5 h-3.5" /> {completedCount} ta dars tugatildi
              </span>
            )}
          </div>
          <p className="text-slate-600 mt-1 max-w-2xl font-medium">Universitetlarga topshirish, hujjatlar tayyorlash va grant yutish bo'yicha bosqichma-bosqich videodarslar to'plami.</p>
        </div>
        
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Dars yoki mavzu izlash..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm bg-white"
          />
        </div>
      </div>

      <AnimatePresence>
        {!searchQuery && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-10">
            
            {/* IN PROGRESS */}
            {inProgressLessons.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-blue-600" /> Davom ettirish
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {inProgressLessons.slice(0, 4).map(lesson => (
                    <div 
                      key={lesson.id} 
                      onClick={() => handleOpenLesson(lesson)}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-transparent hover:border-slate-200 transition-all group"
                    >
                      <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 relative shadow-sm">
                        <img src={lesson.thumbnail} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0 pr-2">
                        <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{lesson.title}</h4>
                        <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                           <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${progressData[lesson.id]?.progressPercent || 0}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* ALL LESSONS */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold text-slate-900">Barcha darslar ro'yxati</h2>
          
          <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredLessons.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredLessons.map(lesson => (
              <motion.div
                key={lesson.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
              >
                <LessonCard
                  lesson={lesson}
                  progressData={progressData[lesson.id]}
                  onClick={handleOpenLesson}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">Darslar topilmadi</h3>
            <p className="text-slate-500 font-medium">Ushbu turkumda yoki qidiruv so'rovi bo'yicha natija yo'q.</p>
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}


function CommunityPage({ initialPrompt, setInitialPrompt }) {
  const [activeTab, setActiveTab] = useState(initialPrompt ? 'chatbot' : 'savollar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  
  const [chatInput, setChatInput] = useState(initialPrompt || '');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Assalomu alaykum! UApply AI Maslahatchisi xizmatingizda. Universitetlar, grantlar yoki hujjat topshirish bo‘yicha qanday yordam bera olaman?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const [mentorFilter, setMentorFilter] = useState('Barchasi');

  const tabs = [
    { id: 'savollar', icon: <MessageSquare className="w-5 h-5" />, label: "Savol-javob" },
    { id: 'tajribalar', icon: <Star className="w-5 h-5" />, label: "Tajribalar" },
    { id: 'elonlar', icon: <Bell className="w-5 h-5" />, label: "E'lonlar" },
    { id: 'mentorlar', icon: <Users className="w-5 h-5" />, label: "Mentorlar" },
    { id: 'maslahatchilar', icon: <Briefcase className="w-5 h-5" />, label: "Konsultantlar" },
    { id: 'chatbot', icon: <MonitorPlay className="w-5 h-5" />, label: "AI ChatBot" }
  ];

  useEffect(() => {
    if (initialPrompt) {
      setActiveTab('chatbot');
      setChatInput(initialPrompt);
      handleSendChatMessage(initialPrompt);
      setInitialPrompt('');
    }
  }, [initialPrompt]);

  const handleSendChatMessage = (textToSent = chatInput) => {
    if (!textToSent.trim()) return;
    const userMsg = { sender: 'user', text: textToSent };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Sizning "${textToSent}" savolingiz tahlil qilindi. Bu mavzu yuzasidan eng yaxshi tavsiyamiz: Platformadagi darslarni va universitetlar ro'yxatini to'liq ko'rib chiqing. Batafsil yordam uchun "Maslahatchilar" bo'limiga o'tishingiz mumkin.`
        }
      ]);
    }, 1500);
  };

  const getPriorityColor = (category) => {
    if (category === 'Muhim') return 'bg-red-50 text-red-600 border-red-200';
    if (category === 'Yangilik') return 'bg-blue-50 text-blue-600 border-blue-200';
    return 'bg-emerald-50 text-emerald-600 border-emerald-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-auto lg:h-[calc(100vh-80px)] flex flex-col lg:flex-row gap-6">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
        <h2 className="text-xl font-extrabold text-slate-900 mb-2 px-2 hidden lg:block">Hamjamiyat</h2>
        
        {/* Mobile Horizontal Tabs */}
        <div className="flex lg:hidden overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-4 px-4">
          {tabs.map(tab => (
             <button 
               key={tab.id} onClick={() => {setActiveTab(tab.id); setSearchQuery('');}}
               className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-bold transition-all whitespace-nowrap shadow-sm ${activeTab === tab.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-100'}`}
             >
               {tab.icon} <span>{tab.label}</span>
             </button>
          ))}
        </div>

        {/* Desktop Vertical Tabs */}
        <div className="hidden lg:flex flex-col gap-2">
          {tabs.map(tab => (
            <button 
              key={tab.id} onClick={() => {setActiveTab(tab.id); setSearchQuery('');}}
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'}`}
            >
              {tab.icon} <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col relative h-[600px] lg:h-auto">
        
        {/* MODAL SYSTEM (For Details) */}
        <AnimatePresence>
          {selectedModalItem && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-50 flex flex-col h-full overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-md p-4 border-b border-slate-100 flex justify-between items-center z-10">
                <button onClick={() => setSelectedModalItem(null)} className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 bg-slate-50 px-3 py-1.5 rounded-xl transition-all">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Orqaga
                </button>
                <span className="font-bold text-slate-900 text-sm">Batafsil ma'lumot</span>
              </div>
              
              <div className="p-6 sm:p-8 flex-1">
                {selectedModalItem.type === 'story' && (
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                      <img src={selectedModalItem.data.photo} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt=""/>
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">{selectedModalItem.data.name}</h2>
                        <p className="text-blue-600 font-bold">{selectedModalItem.data.uni} • {selectedModalItem.data.country}</p>
                        <span className="inline-block mt-2 text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md">{selectedModalItem.data.scholarship}</span>
                      </div>
                    </div>
                    <div className="prose prose-slate max-w-none">
                      <h3 className="font-bold text-slate-900 text-lg">To'liq hikoya</h3>
                      <p className="text-slate-600">{selectedModalItem.data.fullStory}</p>
                      
                      <h3 className="font-bold text-slate-900 text-lg mt-6">Qiyinchiliklar</h3>
                      <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-800 text-sm">{selectedModalItem.data.challenges}</div>
                      
                      <h3 className="font-bold text-slate-900 text-lg mt-6">Tavsiyalar</h3>
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-emerald-800 text-sm">{selectedModalItem.data.advice}</div>
                    </div>
                  </div>
                )}

                {selectedModalItem.type === 'mentor' && (
                  <div className="max-w-2xl mx-auto space-y-6 text-center">
                    <img src={selectedModalItem.data.photo} className="w-32 h-32 rounded-3xl object-cover shadow-md mx-auto" alt=""/>
                    <h2 className="text-3xl font-extrabold text-slate-900">{selectedModalItem.data.name}</h2>
                    <p className="text-blue-600 font-bold text-lg">{selectedModalItem.data.uni} • {selectedModalItem.data.country}</p>
                    <div className="flex justify-center gap-2 mt-2">
                       <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg">{selectedModalItem.data.major}</span>
                       <span className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg">{selectedModalItem.data.scholarship} Grant</span>
                    </div>
                    <p className="text-slate-600 mt-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">{selectedModalItem.data.bio}</p>
                    
                    <button className="w-full sm:w-auto px-8 py-4 mt-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all mx-auto flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" /> Mentorga xabar yuborish
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          
          {/* SAVOL JAVOB */}
          {activeTab === 'savollar' && (
            <motion.div key="savollar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" placeholder="Savollarni qidirish..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none shadow-sm"
                  />
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all whitespace-nowrap">
                  + Savol berish
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {communityData.questions.filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase())).map(q => (
                  <div key={q.id} className="p-5 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all bg-white group">
                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">{q.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5"/> {q.author}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {q.date}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5"/> {q.upvotes}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-600">
                          <MessageSquare className="w-3.5 h-3.5"/> {q.replies} javob
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {q.tags.map(t => <span key={t} className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] uppercase">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAJRIBALAR */}
          {activeTab === 'tajribalar' && (
            <motion.div key="tajribalar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full p-6 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">Muvaffaqiyat tajribalari</h2>
                <p className="text-slate-500 text-sm mt-1">Xalqaro universitetlarga qabul qilingan o'quvchilarning real hikoyalari.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {communityData.stories.map(story => (
                  <motion.div 
                    key={story.id} whileHover={{ y: -5 }} onClick={() => setSelectedModalItem({ type: 'story', data: story })}
                    className="p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl bg-white cursor-pointer transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={story.photo} alt={story.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                      <div>
                        <h3 className="font-bold text-slate-900">{story.name}</h3>
                        <p className="text-xs font-bold text-blue-600">{story.uni} • {story.country}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4">{story.snippet}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                      <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 px-2 py-1 rounded-md">{story.scholarship}</span>
                      <span className="text-xs font-bold text-blue-600 flex items-center">O'qish <ChevronRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* E'LONLAR */}
          {activeTab === 'elonlar' && (
            <motion.div key="elonlar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full p-6 overflow-y-auto">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2"><Bell className="w-6 h-6 text-amber-500"/> Muhim e'lonlar</h2>
              <div className="space-y-4">
                {communityData.announcements.map(ann => (
                  <div key={ann.id} className="p-5 rounded-3xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border ${getPriorityColor(ann.category)}`}>
                        {ann.category}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{ann.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{ann.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{ann.desc}</p>
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Batafsil o'qish →</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MENTORLAR */}
          {activeTab === 'mentorlar' && (
            <motion.div key="mentorlar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" placeholder="Mentor qidirish..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none shadow-sm"
                  />
                </div>
                <select 
                  value={mentorFilter} onChange={(e)=>setMentorFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 outline-none shadow-sm"
                >
                  <option value="Barchasi">Barcha davlatlar</option>
                  {[...new Set(communityData.mentors.map(m=>m.country))].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {communityData.mentors
                    .filter(m => (mentorFilter === 'Barchasi' || m.country === mentorFilter) && m.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(mentor => (
                    <motion.div 
                      key={mentor.id} whileHover={{ y: -5 }} onClick={() => setSelectedModalItem({ type: 'mentor', data: mentor })}
                      className="p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl bg-white cursor-pointer transition-shadow flex flex-col items-center text-center"
                    >
                      <img src={mentor.photo} alt={mentor.name} className="w-20 h-20 rounded-full object-cover mb-3 shadow-sm" />
                      <h3 className="font-extrabold text-slate-900">{mentor.name}</h3>
                      <p className="text-xs font-bold text-blue-600 mb-2">{mentor.uni}</p>
                      <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md mb-4">{mentor.major}</span>
                      <button className="w-full py-2 bg-blue-50 text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-600 hover:text-white transition-colors">
                        Profilni ko'rish
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* MASLAHATCHILAR */}
          {activeTab === 'maslahatchilar' && (
            <motion.div key="maslahatchilar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full p-6 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">Professional Konsultantlar</h2>
                <p className="text-slate-500 text-sm mt-1">Universitetlarga kafolatli tayyorlash bo'yicha ekspertlar.</p>
              </div>
              <div className="grid gap-6">
                {communityData.consultants.map(cons => (
                  <div key={cons.id} className="p-5 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                    <img src={cons.photo} alt={cons.name} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-extrabold text-lg text-slate-900">{cons.name}</h3>
                      <p className="text-sm font-bold text-emerald-600 mb-2">{cons.specialization}</p>
                      <p className="text-sm text-slate-600 mb-3">{cons.bio}</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">Tajriba: {cons.experience}</span>
                        {cons.countries.map(c => <span key={c} className="text-[10px] uppercase font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded">{c}</span>)}
                      </div>
                    </div>
                    <button className="shrink-0 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl text-sm hover:bg-slate-800 transition-colors shadow-md w-full sm:w-auto">
                      Bog'lanish
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CHATBOT */}
          {activeTab === 'chatbot' && (
            <motion.div key="chatbot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full bg-slate-50">
              
              <div className="p-4 bg-white border-b border-slate-100 flex items-center space-x-3 shadow-sm z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg"><MonitorPlay className="w-6 h-6"/></div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-tight">UApply AI Assistant</h3>
                  <p className="text-xs text-emerald-500 font-bold flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" /> Hozir onlayn</p>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => (
                  <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-4 rounded-2xl shadow-sm text-sm font-medium ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-sm border border-blue-700 max-w-[80%]' : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100 max-w-[85%] leading-relaxed'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex gap-3">
                     <div className="p-4 bg-white rounded-2xl rounded-tl-sm border border-slate-100 flex items-center gap-1.5">
                       <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                       <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                     </div>
                  </motion.div>
                )}
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                
                {/* Suggested Prompts */}
                <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-3 pb-1">
                  {["Qaysi universitet menga mos?", "IELTS uchun tayyorgarlik?", "CommonApp qanday ishlaydi?", "Grant topish sirlari"].map(prompt => (
                    <button 
                      key={prompt} onClick={() => handleSendChatMessage(prompt)}
                      className="whitespace-nowrap px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-colors border border-blue-100"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <input 
                    type="text" 
                    placeholder="Menga savol bering..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                    className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-slate-800 font-medium" 
                  />
                  <button 
                    onClick={() => handleSendChatMessage()} 
                    className={`p-2.5 rounded-xl transition-all ${chatInput.trim() ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}