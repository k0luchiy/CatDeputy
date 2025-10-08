import type { DashboardItem, Contact, ContactGroup, NewsArticle, AnalyticsReport, SalaryData, EventItem, Law, Decree, Resolution, BudgetItem, Material, Program, ExternalResource, Message } from '../types';
import { DocumentTextIcon, DocumentDuplicateIcon, CalendarIcon, CheckBadgeIcon, FlagIcon, FolderOpenIcon, ChartBarIcon, CpuChipIcon, CubeTransparentIcon, CodeBracketSquareIcon, GlobeAltIcon } from '../components/icons/FeatureIcons';
import { LdprLogo, KprfLogo, NewPeopleLogo } from '../components/icons/PartyIcons';

export const dashboardItems: DashboardItem[] = [
  { id: '1', title: 'Повестки заседаний ЗС', icon: DocumentTextIcon, path: '/event-plan' },
  { id: '2', title: 'Прочие повестки', icon: DocumentDuplicateIcon, path: '/event-plan' },
  { id: '4', title: 'План мероприятий', icon: CalendarIcon, path: '/event-plan' },
  { id: '5', title: 'Паспорт закона', icon: CheckBadgeIcon, path: '/law-passport' },
  { id: '6', title: 'Указы губернатора', icon: FlagIcon, path: '/decrees' },
  { id: '7', title: 'Постановления Правительства', icon: FolderOpenIcon, path: '/resolutions' },
  { id: '8', title: 'Исполнение бюджета', icon: CpuChipIcon, path: '/budget' },
  { id: '9', title: 'Аналитические материалы', icon: ChartBarIcon, path: '/analytics' },
  { id: '10', title: 'Материалы КС', icon: CubeTransparentIcon, path: '/materials' },
  { id: '11', title: 'Гос. программы', icon: CodeBracketSquareIcon, path: '/programs' },
  { id: '12', title: 'Внешние ресурсы', icon: GlobeAltIcon, path: '/resources' },
];

export const contacts: Contact[] = [
    { id: '1', name: 'Сухих Валерий Александрович', title: 'Председатель Законодательного Собрания', initials: 'СВ', color: 'bg-gray-300', groupId: 'g1', phone: '+7 (343) 111-11-11' },
    { id: '2', name: 'Корнейчук Сергей Викторович', title: 'Советник', initials: 'КС', color: 'bg-cyan-500', groupId: 'g1.3', phone: '+7 (343) 222-22-22' },
    { id: '3', name: 'Браун Елена Альфредовна', title: 'Советник', initials: 'БЕ', color: 'bg-teal-500', groupId: 'g1.3', phone: '+7 (343) 333-33-33' },
    { id: '4', name: 'Хованская Алла Леонидовна', title: 'Советник', initials: 'ХА', color: 'bg-blue-500', groupId: 'g1.3', phone: '+7 (343) 444-44-44' },
    { id: '5', name: 'Игнатова Полина Сергеевна', title: 'Консультант-помощник', initials: 'ИП', color: 'bg-purple-500', groupId: 'g1.3', phone: '+7 (343) 555-55-55' },
    { id: '6', name: 'Григорьев Вячеслав Вениаминович', title: 'Первый заместитель председателя Законодательного Собрания', initials: 'ГВ', color: 'bg-gray-300', groupId: 'g1', phone: '+7 (343) 666-66-66' },
    { id: '7', name: 'Кутузова Ольга Константиновна', title: 'Консультант-помощник', initials: 'КО', color: 'bg-orange-500', groupId: 'g1.3', phone: '+7 (343) 777-77-77' },
    { id: '8', name: 'Айтакова Ксения Алексеевна', title: 'Заместитель председателя Законодательного Собрания', initials: 'АК', color: 'bg-gray-300', groupId: 'g1', phone: '+7 (343) 888-88-88' },
    { id: '9', name: 'Шилоносова Анна Сергеевна', title: 'Консультант-помощник', initials: 'ША', color: 'bg-amber-600', groupId: 'g1.3', phone: '+7 (343) 999-99-99' },
];

export const contactGroups: ContactGroup[] = [
    { id: 'g1', name: 'Законодательное Собрание Свердловской области', isExpanded: true, items: [
        { id: 'g1.1', name: 'Комитеты Законодательного Собрания' },
        { id: 'g1.2', name: 'Фракции Законодательного Собрания' },
        { id: 'g1.3', name: 'Аппарат Законодательного Собрания' },
    ]},
    { id: 'g2', name: 'Органы государственной власти Свердловской области', isExpanded: true, items: [
        { id: 'g2.1', name: 'Губернатор Свердловской области' },
        { id: 'g2.2', name: 'Правительство Свердловской области' },
        { id: 'g2.3', name: 'Исполнительные органы государственной власти Свердловской области' },
    ]},
    { id: 'g3', name: 'Территориальные органы исполнительных органов государственной власти Российской Федерации в Свердловской области' },
    { id: 'g4', name: 'Прокуратуры' },
    { id: 'g5', name: 'Суды' },
    { id: 'g6', name: 'Уполномоченный по правам человека в' },
];

export const newsArticles: NewsArticle[] = [
    { id: 'n1', title: 'Законодательное Собрание Свердловской области', summary: 'Губернатор представил новый план развития транспортной инфраструктуры региона. В центре внимания - строительство ЕКАД-2.', date: '07 октября 2025 года', source: 'Областная газета', sourceType: 'Интернет'},
    { id: 'n2', title: 'Депутаты от ЛДПР предложили новые меры поддержки', summary: 'Депутаты обсудили поправки в закон об образовании, направленные на поддержку молодых специалистов в сельской местности.', date: '06 октября 2025 года', source: 'Вести-Урал', sourceType: 'ТВ', party: 'ldpr'},
    { id: 'n3', title: 'Валерий Сухих: «Особое внимание – подготовке кадров»', summary: 'В Екатеринбурге состоялось заседание Комиссии Совета законодателей, посвященное вопросам кадрового обеспечения промышленности.', date: '06 октября 2025 года', source: 'zsso.ru', sourceType: 'Интернет'},
    { id: 'n4', title: 'КПРФ выступила с инициативой по социальным гарантиям', summary: 'Фракция КПРФ настаивает на расширении пакета социальных гарантий для многодетных семей.', date: '05 октября 2025 года', source: 'Правда', sourceType: 'Газета', party: 'kprf'},
    { id: 'n5', title: '«Новые Люди» о цифровизации госуслуг', summary: 'Представители фракции "Новые Люди" провели круглый стол на тему ускорения цифровой трансформации.', date: '04 октября 2025 года', source: 'TechNews', sourceType: 'Интернет', party: 'new-people'},
];

export const parties = [
    { id: 'ldpr', name: 'ЛДПР', icon: LdprLogo },
    { id: 'kprf', name: 'КПРФ', icon: KprfLogo },
    { id: 'new-people', name: 'НОВЫЕ ЛЮДИ', icon: NewPeopleLogo },
];

export const analyticsReports: AnalyticsReport[] = [
    { id: 'ar1', title: 'Визитка Свердловской области', path: '#' },
    { id: 'ar2', title: 'Законодательное Собрание Свердловской области (IV созыв)', path: '#' },
    { id: 'ar3', title: 'Система автоматизации законотворческой деятельности ЗС СО', path: '#' },
    { id: 'ar4', title: 'Среднемесячная заработная плата в Свердловской области за январь-июнь 2025', category: 'Среднемесячная заработная плата', path: '/analytics/report/salary-2025' },
    { id: 'ar5', title: 'Рождаемость, смертность и естественный прирост населения Свердловской области в 2010-2023 гг.', category: 'Население', path: '#' },
    { id: 'ar6', title: 'Оценка численности населения на 01.01.2024 года и в среднем за 2023 год', path: '#' },
];

export const salaryReportData: SalaryData[] = [
    { name: 'Информация и связь', june2025: 116610.9, janJune2025: 116467.8, percentage: 145.4 },
    { name: 'Добыча полезных ископаемых', june2025: 119212.5, janJune2025: 115400.8, percentage: 144.1 },
    { name: 'Финансы и страхование', june2025: 102582.6, janJune2025: 105314.5, percentage: 131.5 },
    { name: 'Научная и техническая деятельность', june2025: 101037.7, janJune2025: 94615.4, percentage: 118.1 },
    { name: 'Обрабатывающие производства', june2025: 94187.6, janJune2025: 92029.6, percentage: 114.9 },
    { name: 'Энергоснабжающие предприятия', june2025: 89721.1, janJune2025: 86200.8, percentage: 107.6 },
    { name: 'Транспортировка и хранение', june2025: 84810.0, janJune2025: 82993.8, percentage: 103.6 },
    { name: 'Строительство', june2025: 82361.8, janJune2025: 76451.4, percentage: 95.4 },
    { name: 'Образование', june2025: 110615.7, janJune2025: 70955.4, percentage: 88.6 },
    { name: 'Здравоохранение, социальные услуги', june2025: 76530.3, janJune2025: 70017.5, percentage: 87.4 },
];

export const eventPlanItems: EventItem[] = [
    { id: 'e1', date: '2025-10-15', time: '10:00', title: 'Заседание комитета по бюджету, финансам и налогам', location: 'Зал заседаний №1' },
    { id: 'e2', date: '2025-10-15', time: '14:00', title: 'Рабочая группа по вопросам экологии', location: 'Переговорная №3' },
    { id: 'e3', date: '2025-10-16', time: '11:00', title: 'Пленарное заседание Законодательного Собрания', location: 'Большой зал' },
    { id: 'e4', date: '2025-10-17', time: '09:30', title: 'Встреча с представителями общественных организаций', location: 'Конференц-зал' },
];

export const lawPassportItems: Law[] = [
    { id: 'l1', name: 'О внесении изменений в областной закон "О социальной поддержке ветеранов"', number: '101-ОЗ', status: 'Принят', date: '2025-09-20' },
    { id: 'l2', name: 'Об утверждении стратегии цифрового развития региона до 2030 года', number: '105-ОЗ', status: 'На рассмотрении', date: '2025-09-28' },
    { id: 'l3', name: 'О регулировании отдельных вопросов в сфере обращения с животными', number: '108-ОЗ', status: 'На рассмотрении', date: '2025-10-05' },
    { id: 'l4', name: 'О молодежной политике в Свердловской области', number: '98-ОЗ', status: 'Отклонен', date: '2025-08-15' },
];

export const decreeItems: Decree[] = [
    { id: 'd1', title: 'О мерах по повышению инвестиционной привлекательности Свердловской области', number: '512-УГ', date: '2025-10-01' },
    { id: 'd2', title: 'О создании природного парка "Уральские предгорья"', number: '509-УГ', date: '2025-09-25' },
    { id: 'd3', title: 'О введении особого противопожарного режима на территории области', number: '490-УГ', date: '2025-09-10' },
];

export const resolutionItems: Resolution[] = [
    { id: 'r1', title: 'Об утверждении порядка предоставления субсидий агропромышленным предприятиям', number: '720-ПП', date: '2025-09-30' },
    { id: 'r2', title: 'О программе капитального ремонта многоквартирных домов на 2026 год', number: '715-ПП', date: '2025-09-22' },
    { id: 'r3', title: 'О подготовке объектов ЖКХ к осенне-зимнему периоду', number: '698-ПП', date: '2025-09-05' },
];

export const budgetItems: BudgetItem[] = [
    { id: 'b1', title: 'Закон об областном бюджете на 2025 год', type: 'Документ', summary: 'Основной финансовый документ региона.' },
    { id: 'b2', title: 'Отчет об исполнении бюджета за I полугодие 2025', type: 'Документ', summary: 'Анализ доходов и расходов.' },
    { id: 'b3', title: 'Финансирование здравоохранения', type: 'Статья', summary: 'Обзор расходов на медицину.' },
];

export const materialsItems: Material[] = [
    { id: 'm1', title: 'Аналитическая справка по проекту закона №105-ОЗ', date: '2025-09-27', committee: 'Комитет по законодательству' },
    { id: 'm2', title: 'Заключение на поправки к бюджету', date: '2025-09-20', committee: 'Комитет по бюджету' },
    { id: 'm3', title: 'Протокол заседания от 15.09.2025', date: '2025-09-16', committee: 'Комитет по соцполитике' },
];

export const programItems: Program[] = [
    { id: 'p1', title: 'Развитие транспортной системы Свердловской области', period: '2022-2027', status: 'Действует' },
    { id: 'p2', title: 'Чистая вода', period: '2019-2024', status: 'Завершена' },
    { id: 'p3', title: 'Формирование комфортной городской среды', period: '2023-2030', status: 'Действует' },
];

export const resourceItems: ExternalResource[] = [
    { id: 'res1', title: 'Официальный интернет-портал правовой информации', description: 'pravo.gov.ru', url: 'http://pravo.gov.ru' },
    { id: 'res2', title: 'Сайт Правительства Свердловской области', description: 'midural.ru', url: 'https://midural.ru' },
    { id: 'res3', title: 'Электронный бюджет', description: 'budget.gov.ru', url: 'http://budget.gov.ru' },
];

export const initialMessages: Message[] = [
    { id: 'msg1', senderId: '2', receiverId: 'user', text: 'Здравствуйте! Уточните, пожалуйста, по повестке завтрашнего заседания.', timestamp: '10:41'},
    { id: 'msg2', senderId: 'user', receiverId: '2', text: 'Добрый день, Сергей Викторович. Конечно, сейчас отправлю вам финальную версию на почту.', timestamp: '10:42'},
    { id: 'msg3', senderId: '2', receiverId: 'user', text: 'Спасибо, получил!', timestamp: '10:45'},
];