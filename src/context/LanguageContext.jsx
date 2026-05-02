import { createContext, useContext, useState } from 'react'

// ── Bilingual lookup arrays ─────────────────────────────────────────────────
// Each entry is [englishCanonicalValue, vietnameseLabel]
// Tasks always store the English canonical value so data is language-agnostic.

export const SPECIALTIES = [
  ['Cardiology', 'Tim mạch'],
  ['Endocrinology', 'Nội tiết'],
  ['Gastroenterology', 'Tiêu hóa'],
  ['Hematology/Oncology', 'Huyết học / Ung thư'],
  ['Nephrology', 'Thận học'],
  ['Pulmonology', 'Hô hấp'],
  ['Rheumatology', 'Cơ xương khớp'],
  ['Allergy and Immunology', 'Dị ứng và Miễn dịch'],
  ['Dermatology', 'Da liễu'],
  ['OBGYN', 'Sản phụ khoa'],
  ['General Surgery', 'Ngoại tổng quát'],
  ['Orthopedic Surgery', 'Ngoại chỉnh hình'],
  ['Vascular Surgery', 'Ngoại mạch máu'],
  ['Thoracic and Cardiac Surgery', 'Ngoại lồng ngực và tim'],
  ['Neurosurgery', 'Ngoại thần kinh'],
  ['Plastic/Reconstructive Surgery', 'Phẫu thuật tạo hình'],
  ['Otolaryngology (ENT)', 'Tai mũi họng (TMH)'],
  ['Ophthalmology', 'Nhãn khoa'],
  ['Neurology', 'Thần kinh'],
  ['Psychiatry', 'Tâm thần'],
  ['Urology', 'Tiết niệu'],
  ['Geriatric Medicine', 'Lão khoa'],
  ['Physical Medicine and Rehabilitation (PM&R)', 'Y học vật lý và phục hồi chức năng'],
]

export const SCREENING_OPTIONS = [
  ['DEXA (bone density scan)', 'DEXA (đo mật độ xương)'],
  ['Colonoscopy', 'Nội soi đại tràng'],
  ['Fecal Occult Blood Test (FOBT)', 'Xét nghiệm máu ẩn trong phân (FOBT)'],
  ['Mammogram', 'Chụp nhũ ảnh'],
  ['Cervical Cancer Screening', 'Tầm soát ung thư cổ tử cung'],
  ['Diabetic Eye Exam (Ophthalmologist)', 'Khám mắt tiểu đường (Nhãn khoa)'],
]

export const FASTING_OPTIONS = [
  ['Fasting', 'Nhịn Ăn'],
  ['Non-fasting', 'Không Nhịn Ăn'],
]

export const IMAGING_TYPES = [
  ['CT', 'CT'],
  ['MRI', 'MRI'],
  ['X-ray', 'X-quang'],
  ['Ultrasound', 'Siêu âm'],
  ['PET', 'PET'],
]

/**
 * Given a bilingual lookup array and a stored English canonical value,
 * return the label for the current language.
 */
export function getLabel(pairs, value, lang) {
  if (!value) return value
  const pair = pairs.find(p => p[0] === value)
  return pair ? pair[lang === 'vi' ? 1 : 0] : value
}

// ── Translations ────────────────────────────────────────────────────────────

const translations = {
  en: {
    // Header
    tagline: 'your medical to-do list',
    addTask: 'Add Task',

    // Dashboard
    completedTasksTitle: 'Completed Tasks',
    openTasksTitle: 'Open Tasks',
    tasksDone: (n) => `${n} task${n !== 1 ? 's' : ''} done`,
    tasksRemaining: (n) => `${n} task${n !== 1 ? 's' : ''} remaining`,
    viewOpen: 'View Open',
    viewCompleted: 'View Completed',
    noCompletedYet: 'No completed tasks yet',
    noCompletedDesc: "Mark a task as done and it'll appear here",
    noOpenTasks: 'No open tasks',
    noOpenDesc: 'Your medical to-do list is empty',

    // Task Card
    typeLabels: {
      lab: 'Labs',
      imaging: 'Imaging',
      referral: 'Referral',
      screening: 'Screening',
      prescription: 'Prescription',
      callback: 'Call Back',
    },
    completeBadge: 'Complete',
    overdueBadge: 'Overdue',
    markIncomplete: 'Mark as incomplete',
    markComplete: 'Mark as complete',
    editTaskLabel: 'Edit task',
    deleteTaskLabel: 'Delete task',
    dateLocale: 'en-US',

    // Add Task Modal
    back: 'Back',
    editTitle: (label) => `Edit ${label} Task`,
    newTitle: (label) => `New ${label} Task`,
    addATask: 'Add a Task',
    close: 'Close',
    taskTypes: [
      { id: 'lab', label: 'Labs', icon: '🧪', desc: 'Blood work, urine tests' },
      { id: 'imaging', label: 'Imaging', icon: '🩻', desc: 'CT, MRI, X-ray, Ultrasound' },
      { id: 'referral', label: 'Referral', icon: '👨‍⚕️', desc: 'See a specialist' },
      { id: 'screening', label: 'Screening', icon: '🔍', desc: 'Colonoscopy, mammogram, etc.' },
      { id: 'prescription', label: 'Pick Up Prescription', icon: '💊', desc: 'Medications to pick up' },
      { id: 'callback', label: 'Call Back', icon: '📞', desc: 'Call to make an appointment' },
    ],

    // Task Form
    taskNameLabel: 'Task Name',
    taskNamePlaceholders: {
      lab: 'e.g. "Lipid Panel" or "CMP"',
      imaging: 'e.g. "X-ray" or "Ultrasound"',
      screening: 'e.g. "DEXA" or "Colonoscopy"',
      referral: 'e.g. "Orthopedic Surgery" or "Dermatology"',
      default: 'Task Name',
    },
    fastingLabel: 'Fasting',
    dueDateLabel: 'Due Date',
    orderingDoctorLabel: 'Ordering Doctor',
    notesLabel: 'Notes',
    notesPlaceholder: 'Any additional notes…',
    imagingTypeLabel: 'Imaging Type',
    officePhoneLabel: 'Office Phone',
    bodyPartsLabel: 'Body Part(s)',
    bodyPartsPlaceholder: 'e.g. Chest, Abdomen',
    specialtyLabel: 'Specialty',
    selectSpecialtyPlaceholder: 'Select specialty…',
    doctorNameLabel: 'Doctor Name',
    phoneNumberLabel: 'Phone Number',
    screeningTypeLabel: 'Screening Type',
    selectScreeningPlaceholder: 'Select screening…',
    prescriptionNamesLabel: 'Prescription Name(s)',
    prescriptionPlaceholder: 'e.g. Metformin 500mg, Lisinopril 10mg',
    requiredField: 'This field is required',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
  },

  vi: {
    // Header
    tagline: 'danh sách việc y tế của bạn',
    addTask: 'Thêm Nhiệm Vụ',

    // Dashboard
    completedTasksTitle: 'Nhiệm Vụ Đã Hoàn Thành',
    openTasksTitle: 'Nhiệm Vụ Đang Mở',
    tasksDone: (n) => `${n} nhiệm vụ đã hoàn thành`,
    tasksRemaining: (n) => `${n} nhiệm vụ còn lại`,
    viewOpen: 'Xem Đang Mở',
    viewCompleted: 'Xem Đã Hoàn Thành',
    noCompletedYet: 'Chưa có nhiệm vụ nào hoàn thành',
    noCompletedDesc: 'Đánh dấu một nhiệm vụ là xong và nó sẽ hiển thị ở đây',
    noOpenTasks: 'Không có nhiệm vụ nào',
    noOpenDesc: 'Danh sách việc y tế của bạn đang trống',

    // Task Card
    typeLabels: {
      lab: 'Xét Nghiệm',
      imaging: 'Hình Ảnh Y Tế',
      referral: 'Giới Thiệu',
      screening: 'Tầm Soát',
      prescription: 'Đơn Thuốc',
      callback: 'Gọi Lại',
    },
    completeBadge: 'Hoàn Thành',
    overdueBadge: 'Quá Hạn',
    markIncomplete: 'Đánh dấu chưa xong',
    markComplete: 'Đánh dấu đã xong',
    editTaskLabel: 'Chỉnh sửa nhiệm vụ',
    deleteTaskLabel: 'Xóa nhiệm vụ',
    dateLocale: 'vi-VN',

    // Add Task Modal
    back: 'Quay Lại',
    editTitle: (label) => `Chỉnh Sửa: ${label}`,
    newTitle: (label) => `${label} Mới`,
    addATask: 'Thêm Nhiệm Vụ',
    close: 'Đóng',
    taskTypes: [
      { id: 'lab', label: 'Xét Nghiệm', icon: '🧪', desc: 'Xét nghiệm máu, nước tiểu' },
      { id: 'imaging', label: 'Hình Ảnh Y Tế', icon: '🩻', desc: 'CT, MRI, X-quang, Siêu âm' },
      { id: 'referral', label: 'Giới Thiệu', icon: '👨‍⚕️', desc: 'Gặp bác sĩ chuyên khoa' },
      { id: 'screening', label: 'Tầm Soát', icon: '🔍', desc: 'Nội soi đại tràng, chụp nhũ ảnh, v.v.' },
      { id: 'prescription', label: 'Lấy Đơn Thuốc', icon: '💊', desc: 'Thuốc cần lấy' },
      { id: 'callback', label: 'Gọi Lại', icon: '📞', desc: 'Gọi để đặt lịch hẹn' },
    ],

    // Task Form
    taskNameLabel: 'Tên Nhiệm Vụ',
    taskNamePlaceholders: {
      lab: 'vd. "Lipid Panel" hoặc "CMP"',
      imaging: 'vd. "X-quang" hoặc "Siêu âm"',
      screening: 'vd. "DEXA" hoặc "Nội soi đại tràng"',
      referral: 'vd. "Ngoại chỉnh hình" hoặc "Da liễu"',
      default: 'Tên Nhiệm Vụ',
    },
    fastingLabel: 'Nhịn Ăn',
    dueDateLabel: 'Ngày Hạn',
    orderingDoctorLabel: 'Bác Sĩ Chỉ Định',
    notesLabel: 'Ghi Chú',
    notesPlaceholder: 'Ghi chú thêm…',
    imagingTypeLabel: 'Loại Hình Ảnh',
    officePhoneLabel: 'Điện Thoại Phòng Khám',
    bodyPartsLabel: 'Bộ Phận Cơ Thể',
    bodyPartsPlaceholder: 'vd. Ngực, Bụng',
    specialtyLabel: 'Chuyên Khoa',
    selectSpecialtyPlaceholder: 'Chọn chuyên khoa…',
    doctorNameLabel: 'Tên Bác Sĩ',
    phoneNumberLabel: 'Số Điện Thoại',
    screeningTypeLabel: 'Loại Tầm Soát',
    selectScreeningPlaceholder: 'Chọn loại tầm soát…',
    prescriptionNamesLabel: 'Tên Thuốc',
    prescriptionPlaceholder: 'vd. Metformin 500mg, Lisinopril 10mg',
    requiredField: 'Trường này là bắt buộc',
    cancel: 'Hủy',
    saveChanges: 'Lưu Thay Đổi',
  },
}

// ── Context ─────────────────────────────────────────────────────────────────

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('medmap-lang') || 'en'
  })

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'vi' : 'en'
    setLang(next)
    localStorage.setItem('medmap-lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
