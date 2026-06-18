import { createContext, useContext, useState } from 'react'

// ── Multilingual lookup arrays ──────────────────────────────────────────────
// Each entry is [englishCanonicalValue, vietnameseLabel, spanishLabel]
// Tasks always store the English canonical value so data is language-agnostic.

export const SPECIALTIES = [
  ['Cardiology', 'Tim mạch', 'Cardiología'],
  ['Endocrinology', 'Nội tiết', 'Endocrinología'],
  ['Gastroenterology', 'Tiêu hóa', 'Gastroenterología'],
  ['Hematology/Oncology', 'Huyết học / Ung thư', 'Hematología/Oncología'],
  ['Nephrology', 'Thận học', 'Nefrología'],
  ['Pulmonology', 'Hô hấp', 'Neumología'],
  ['Rheumatology', 'Cơ xương khớp', 'Reumatología'],
  ['Allergy and Immunology', 'Dị ứng và Miễn dịch', 'Alergia e Inmunología'],
  ['Dermatology', 'Da liễu', 'Dermatología'],
  ['OBGYN', 'Sản phụ khoa', 'Ginecología y Obstetricia'],
  ['General Surgery', 'Ngoại tổng quát', 'Cirugía General'],
  ['Orthopedic Surgery', 'Ngoại chỉnh hình', 'Cirugía Ortopédica'],
  ['Vascular Surgery', 'Ngoại mạch máu', 'Cirugía Vascular'],
  ['Thoracic and Cardiac Surgery', 'Ngoại lồng ngực và tim', 'Cirugía Torácica y Cardíaca'],
  ['Neurosurgery', 'Ngoại thần kinh', 'Neurocirugía'],
  ['Plastic/Reconstructive Surgery', 'Phẫu thuật tạo hình', 'Cirugía Plástica y Reconstructiva'],
  ['Otolaryngology (ENT)', 'Tai mũi họng (TMH)', 'Otorrinolaringología (ORL)'],
  ['Ophthalmology', 'Nhãn khoa', 'Oftalmología'],
  ['Neurology', 'Thần kinh', 'Neurología'],
  ['Psychiatry', 'Tâm thần', 'Psiquiatría'],
  ['Urology', 'Tiết niệu', 'Urología'],
  ['Geriatric Medicine', 'Lão khoa', 'Geriatría'],
  ['Physical Medicine and Rehabilitation (PM&R)', 'Y học vật lý và phục hồi chức năng', 'Medicina Física y Rehabilitación'],
]

export const SCREENING_OPTIONS = [
  ['DEXA (bone density scan)', 'DEXA (đo mật độ xương)', 'DEXA (densitometría ósea)'],
  ['Colonoscopy', 'Nội soi đại tràng', 'Colonoscopía'],
  ['Fecal Occult Blood Test (FOBT)', 'Xét nghiệm máu ẩn trong phân (FOBT)', 'Prueba de Sangre Oculta en Heces (PSOH)'],
  ['Mammogram', 'Chụp nhũ ảnh', 'Mamografía'],
  ['Cervical Cancer Screening', 'Tầm soát ung thư cổ tử cung', 'Tamizaje de Cáncer Cervical'],
  ['Diabetic Eye Exam (Ophthalmologist)', 'Khám mắt tiểu đường (Nhãn khoa)', 'Examen Ocular Diabético (Oftalmólogo)'],
]

export const FASTING_OPTIONS = [
  ['Fasting', 'Nhịn Ăn', 'En Ayunas'],
  ['Non-fasting', 'Không Nhịn Ăn', 'Sin Ayuno'],
]

export const IMAGING_TYPES = [
  ['CT', 'CT', 'TC'],
  ['MRI', 'MRI', 'RM'],
  ['X-ray', 'X-quang', 'Rayos X'],
  ['Ultrasound', 'Siêu âm', 'Ultrasonido'],
  ['PET', 'PET', 'PET'],
]

/**
 * Given a multilingual lookup array and a stored English canonical value,
 * return the label for the current language.
 */
export function getLabel(pairs, value, lang) {
  if (!value) return value
  const pair = pairs.find(p => p[0] === value)
  if (!pair) return value
  if (lang === 'vi') return pair[1]
  if (lang === 'es') return pair[2]
  return pair[0]
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

  es: {
    // Header
    tagline: 'tu lista de tareas médicas',
    addTask: 'Agregar Tarea',

    // Dashboard
    completedTasksTitle: 'Tareas Completadas',
    openTasksTitle: 'Tareas Pendientes',
    tasksDone: (n) => `${n} tarea${n !== 1 ? 's' : ''} completada${n !== 1 ? 's' : ''}`,
    tasksRemaining: (n) => `${n} tarea${n !== 1 ? 's' : ''} pendiente${n !== 1 ? 's' : ''}`,
    viewOpen: 'Ver Pendientes',
    viewCompleted: 'Ver Completadas',
    noCompletedYet: 'Aún no hay tareas completadas',
    noCompletedDesc: 'Marca una tarea como hecha y aparecerá aquí',
    noOpenTasks: 'Sin tareas pendientes',
    noOpenDesc: 'Tu lista de tareas médicas está vacía',

    // Task Card
    typeLabels: {
      lab: 'Laboratorios',
      imaging: 'Imágenes Médicas',
      referral: 'Referido',
      screening: 'Tamizaje',
      prescription: 'Receta',
      callback: 'Llamar',
    },
    completeBadge: 'Completado',
    overdueBadge: 'Atrasado',
    markIncomplete: 'Marcar como incompleto',
    markComplete: 'Marcar como completo',
    editTaskLabel: 'Editar tarea',
    deleteTaskLabel: 'Eliminar tarea',
    dateLocale: 'es-ES',

    // Add Task Modal
    back: 'Atrás',
    editTitle: (label) => `Editar Tarea: ${label}`,
    newTitle: (label) => `Nueva Tarea: ${label}`,
    addATask: 'Agregar una Tarea',
    close: 'Cerrar',
    taskTypes: [
      { id: 'lab', label: 'Laboratorios', icon: '🧪', desc: 'Análisis de sangre, orina' },
      { id: 'imaging', label: 'Imágenes Médicas', icon: '🩻', desc: 'TC, RM, Rayos X, Ultrasonido' },
      { id: 'referral', label: 'Referido', icon: '👨‍⚕️', desc: 'Ver a un especialista' },
      { id: 'screening', label: 'Tamizaje', icon: '🔍', desc: 'Colonoscopía, mamografía, etc.' },
      { id: 'prescription', label: 'Recoger Receta', icon: '💊', desc: 'Medicamentos a recoger' },
      { id: 'callback', label: 'Llamar', icon: '📞', desc: 'Llamar para hacer una cita' },
    ],

    // Task Form
    taskNameLabel: 'Nombre de la Tarea',
    taskNamePlaceholders: {
      lab: 'ej. "Panel Lipídico" o "QMS"',
      imaging: 'ej. "Rayos X" o "Ultrasonido"',
      screening: 'ej. "DEXA" o "Colonoscopía"',
      referral: 'ej. "Cirugía Ortopédica" o "Dermatología"',
      default: 'Nombre de la Tarea',
    },
    fastingLabel: 'En Ayunas',
    dueDateLabel: 'Fecha Límite',
    orderingDoctorLabel: 'Médico que Ordena',
    notesLabel: 'Notas',
    notesPlaceholder: 'Notas adicionales…',
    imagingTypeLabel: 'Tipo de Imagen',
    officePhoneLabel: 'Teléfono del Consultorio',
    bodyPartsLabel: 'Parte(s) del Cuerpo',
    bodyPartsPlaceholder: 'ej. Tórax, Abdomen',
    specialtyLabel: 'Especialidad',
    selectSpecialtyPlaceholder: 'Seleccionar especialidad…',
    doctorNameLabel: 'Nombre del Médico',
    phoneNumberLabel: 'Número de Teléfono',
    screeningTypeLabel: 'Tipo de Tamizaje',
    selectScreeningPlaceholder: 'Seleccionar tamizaje…',
    prescriptionNamesLabel: 'Nombre(s) del Medicamento',
    prescriptionPlaceholder: 'ej. Metformina 500mg, Lisinopril 10mg',
    requiredField: 'Este campo es obligatorio',
    cancel: 'Cancelar',
    saveChanges: 'Guardar Cambios',
  },
}

// ── Context ─────────────────────────────────────────────────────────────────

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('medmap-lang')
    return ['en', 'vi', 'es'].includes(saved) ? saved : 'en'
  })

  const LANG_CYCLE = ['en', 'vi', 'es']

  const toggleLanguage = (target) => {
    const next = target ?? LANG_CYCLE[(LANG_CYCLE.indexOf(lang) + 1) % LANG_CYCLE.length]
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
