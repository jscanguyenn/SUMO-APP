import { useState } from 'react'
import { useLanguage, SPECIALTIES, SCREENING_OPTIONS, FASTING_OPTIONS, IMAGING_TYPES } from '../context/LanguageContext'

const inputClass =
  'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition'

const inputErr =
  'border-red-400 focus:ring-red-200 focus:border-red-400'

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}

function FieldError({ show, message }) {
  if (!show) return null
  return <p className="text-xs text-red-500 mt-1">{message}</p>
}

const EMPTY_FORM = {
  taskName: '',
  fasting: '',
  dueDate: '',
  orderingDoctor: '',
  notes: '',
  imagingTypes: [],
  officePhone: '',
  bodyParts: '',
  specialty: '',
  doctorName: '',
  phoneNumber: '',
  screeningType: '',
  prescriptionNames: '',
}

export default function TaskForm({ type, onSubmit, onCancel, initialValues, isEditing }) {
  const { lang, t } = useLanguage()

  const [form, setForm] = useState(() => ({
    ...EMPTY_FORM,
    ...(initialValues
      ? {
          taskName: initialValues.taskName ?? '',
          fasting: initialValues.fasting ?? '',
          dueDate: initialValues.dueDate ?? '',
          orderingDoctor: initialValues.orderingDoctor ?? '',
          notes: initialValues.notes ?? '',
          imagingTypes: initialValues.imagingTypes ?? [],
          officePhone: initialValues.officePhone ?? '',
          bodyParts: initialValues.bodyParts ?? '',
          specialty: initialValues.specialty ?? '',
          doctorName: initialValues.doctorName ?? '',
          phoneNumber: initialValues.phoneNumber ?? '',
          screeningType: initialValues.screeningType ?? '',
          prescriptionNames: initialValues.prescriptionNames ?? '',
        }
      : {}),
  }))
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }))
  }

  // Imaging types are stored as English canonical values (e.g. "X-ray", not "X-quang")
  const toggleImagingType = (canonicalValue) => {
    setForm(prev => ({
      ...prev,
      imagingTypes: prev.imagingTypes.includes(canonicalValue)
        ? prev.imagingTypes.filter(x => x !== canonicalValue)
        : [...prev.imagingTypes, canonicalValue],
    }))
    if (errors.imagingTypes) setErrors(prev => ({ ...prev, imagingTypes: false }))
  }

  const validate = () => {
    const e = {}
    if (!form.taskName.trim()) e.taskName = true

    if (type === 'lab') {
      if (!form.fasting) e.fasting = true
      if (!form.dueDate) e.dueDate = true
      if (!form.orderingDoctor.trim()) e.orderingDoctor = true
    }
    if (type === 'imaging') {
      if (form.imagingTypes.length === 0) e.imagingTypes = true
      if (!form.dueDate) e.dueDate = true
      if (!form.orderingDoctor.trim()) e.orderingDoctor = true
    }
    if (type === 'referral') {
      if (!form.specialty) e.specialty = true
      if (!form.dueDate) e.dueDate = true
      if (!form.doctorName.trim()) e.doctorName = true
    }
    if (type === 'screening') {
      if (!form.screeningType) e.screeningType = true
      if (!form.dueDate) e.dueDate = true
    }
    if (type === 'prescription') {
      if (!form.prescriptionNames.trim()) e.prescriptionNames = true
    }
    if (type === 'callback') {
      if (!form.doctorName.trim()) e.doctorName = true
      if (!form.phoneNumber.trim()) e.phoneNumber = true
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ ...form, type })
  }

  const taskNamePlaceholder =
    t.taskNamePlaceholders[type] ?? t.taskNamePlaceholders.default

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Task Name — universal */}
      <div>
        <Label required>{t.taskNameLabel}</Label>
        <input
          type="text"
          placeholder={taskNamePlaceholder}
          value={form.taskName}
          onChange={set('taskName')}
          className={`${inputClass} ${errors.taskName ? inputErr : ''}`}
        />
        <FieldError show={errors.taskName} message={t.requiredField} />
      </div>

      {/* ── LAB ── */}
      {type === 'lab' && <>
        <div>
          <Label required>{t.fastingLabel}</Label>
          <div className={`flex gap-4 mt-1 ${errors.fasting ? 'p-2 border border-red-400 rounded-lg' : ''}`}>
            {FASTING_OPTIONS.map(([canonical, viLabel]) => {
              const displayLabel = lang === 'vi' ? viLabel : canonical
              return (
                <label key={canonical} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fasting"
                    value={canonical}
                    checked={form.fasting === canonical}
                    onChange={() => {
                      setForm(prev => ({ ...prev, fasting: canonical }))
                      if (errors.fasting) setErrors(prev => ({ ...prev, fasting: false }))
                    }}
                    className="accent-teal-500"
                  />
                  <span className="text-sm text-slate-700">{displayLabel}</span>
                </label>
              )
            })}
          </div>
          <FieldError show={errors.fasting} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.dueDateLabel}</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.orderingDoctorLabel}</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.orderingDoctor} onChange={set('orderingDoctor')}
            className={`${inputClass} ${errors.orderingDoctor ? inputErr : ''}`} />
          <FieldError show={errors.orderingDoctor} message={t.requiredField} />
        </div>
        <div>
          <Label>{t.notesLabel}</Label>
          <textarea rows={3} placeholder={t.notesPlaceholder} value={form.notes} onChange={set('notes')}
            className={inputClass} />
        </div>
      </>}

      {/* ── IMAGING ── */}
      {type === 'imaging' && <>
        <div>
          <Label required>{t.imagingTypeLabel}</Label>
          <div className={`flex flex-wrap gap-2 mt-1 ${errors.imagingTypes ? 'p-2 border border-red-400 rounded-lg' : ''}`}>
            {IMAGING_TYPES.map(([canonical, viLabel]) => {
              const displayLabel = lang === 'vi' ? viLabel : canonical
              return (
                <button
                  key={canonical}
                  type="button"
                  onClick={() => toggleImagingType(canonical)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                    form.imagingTypes.includes(canonical)
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                >
                  {displayLabel}
                </button>
              )
            })}
          </div>
          <FieldError show={errors.imagingTypes} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.dueDateLabel}</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.orderingDoctorLabel}</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.orderingDoctor} onChange={set('orderingDoctor')}
            className={`${inputClass} ${errors.orderingDoctor ? inputErr : ''}`} />
          <FieldError show={errors.orderingDoctor} message={t.requiredField} />
        </div>
        <div>
          <Label>{t.officePhoneLabel}</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.officePhone} onChange={set('officePhone')}
            className={inputClass} />
        </div>
        <div>
          <Label>{t.bodyPartsLabel}</Label>
          <input type="text" placeholder={t.bodyPartsPlaceholder} value={form.bodyParts} onChange={set('bodyParts')}
            className={inputClass} />
        </div>
        <div>
          <Label>{t.notesLabel}</Label>
          <textarea rows={3} placeholder={t.notesPlaceholder} value={form.notes} onChange={set('notes')}
            className={inputClass} />
        </div>
      </>}

      {/* ── REFERRAL ── */}
      {type === 'referral' && <>
        <div>
          <Label required>{t.specialtyLabel}</Label>
          <select value={form.specialty} onChange={set('specialty')}
            className={`${inputClass} ${errors.specialty ? inputErr : ''}`}>
            <option value="">{t.selectSpecialtyPlaceholder}</option>
            {SPECIALTIES.map(([canonical, viLabel]) => (
              <option key={canonical} value={canonical}>
                {lang === 'vi' ? viLabel : canonical}
              </option>
            ))}
          </select>
          <FieldError show={errors.specialty} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.dueDateLabel}</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.doctorNameLabel}</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.doctorName} onChange={set('doctorName')}
            className={`${inputClass} ${errors.doctorName ? inputErr : ''}`} />
          <FieldError show={errors.doctorName} message={t.requiredField} />
        </div>
        <div>
          <Label>{t.phoneNumberLabel}</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.phoneNumber} onChange={set('phoneNumber')}
            className={inputClass} />
        </div>
      </>}

      {/* ── SCREENING ── */}
      {type === 'screening' && <>
        <div>
          <Label required>{t.screeningTypeLabel}</Label>
          <select value={form.screeningType} onChange={set('screeningType')}
            className={`${inputClass} ${errors.screeningType ? inputErr : ''}`}>
            <option value="">{t.selectScreeningPlaceholder}</option>
            {SCREENING_OPTIONS.map(([canonical, viLabel]) => (
              <option key={canonical} value={canonical}>
                {lang === 'vi' ? viLabel : canonical}
              </option>
            ))}
          </select>
          <FieldError show={errors.screeningType} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.dueDateLabel}</Label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')}
            className={`${inputClass} ${errors.dueDate ? inputErr : ''}`} />
          <FieldError show={errors.dueDate} message={t.requiredField} />
        </div>
        <div>
          <Label>{t.orderingDoctorLabel}</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.orderingDoctor} onChange={set('orderingDoctor')}
            className={inputClass} />
        </div>
        <div>
          <Label>{t.phoneNumberLabel}</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.phoneNumber} onChange={set('phoneNumber')}
            className={inputClass} />
        </div>
      </>}

      {/* ── PRESCRIPTION ── */}
      {type === 'prescription' && <>
        <div>
          <Label required>{t.prescriptionNamesLabel}</Label>
          <textarea
            rows={3}
            placeholder={t.prescriptionPlaceholder}
            value={form.prescriptionNames}
            onChange={set('prescriptionNames')}
            className={`${inputClass} ${errors.prescriptionNames ? inputErr : ''}`}
          />
          <FieldError show={errors.prescriptionNames} message={t.requiredField} />
        </div>
      </>}

      {/* ── CALLBACK ── */}
      {type === 'callback' && <>
        <div>
          <Label required>{t.doctorNameLabel}</Label>
          <input type="text" placeholder="Dr. Jane Smith" value={form.doctorName} onChange={set('doctorName')}
            className={`${inputClass} ${errors.doctorName ? inputErr : ''}`} />
          <FieldError show={errors.doctorName} message={t.requiredField} />
        </div>
        <div>
          <Label required>{t.phoneNumberLabel}</Label>
          <input type="tel" placeholder="(555) 000-0000" value={form.phoneNumber} onChange={set('phoneNumber')}
            className={`${inputClass} ${errors.phoneNumber ? inputErr : ''}`} />
          <FieldError show={errors.phoneNumber} message={t.requiredField} />
        </div>
      </>}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          {t.cancel}
        </button>
        <button
          type="submit"
          className="flex-1 bg-teal-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-600 active:bg-teal-700 transition-colors"
        >
          {isEditing ? t.saveChanges : t.addTask}
        </button>
      </div>
    </form>
  )
}
