# MedMap

## Problem Statement

Patients come in to see their primary care provider (PCP) and are typically given lab work or imaging to do, referrals to specialists they need to see, or screenings they need to be up to date on **before** their next visit. It is usually another 3 months–1 year before they are scheduled to see their PCP again, and by then, they often forget what workup they were supposed to do. This leads to:

- Delays in health prevention measures
- PCPs unable to see patient health status
- Staff bombarded with phone calls from patients about things they were supposed to get done

---

## Goal

Create an MVP website for healthcare where patients can keep track of labs, referrals, imaging, and prescriptions they have to complete. This website acts like a **homework checklist** for patients to finish before their next visit with a specialist or doctor.

---

## Tech Stack

This is a simple interactive prototype/proof of concept.

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) |
| Styling | Tailwind 4 |
| Deployment/Hosting | Vercel |
| Authentication | ❌ Not in MVP — future iteration |
| Database | Local storage for MVP — Postgres in a future iteration |

---

## Design Notes

- Must be **responsive**. Optimize for **desktops** (primary audience: recruiters). Some may use tablets and phones.
- MVP will be **light mode only**.
- App name: **MedMap**

---

## Requirements

### Feature: Create a Task Item

The major task types a user can create:

- Labs
- Imaging
- Screening Measures
- Referrals
- Pick Up Prescription
- Call Back to Make an Appointment

> **Note:** All task types include a required **Task Name** field (free-text, e.g. "Lipid Panel" or "Call Dr. Smith") so the user can distinguish tasks of the same type on the dashboard.

---

### Detail: Lab Tasks

> `*` = required field

| Field | Type | Notes |
|---|---|---|
| Task Name* | Text field | Short label for the task |
| Fasting* | Boolean toggle | "Fasting" or "Non-fasting" |
| Due Date* | Date picker | When it should be done |
| Ordering Doctor* | Text field | Name of the doctor who ordered the lab |
| Notes | Text area | General notes |

---

### Detail: Imaging Tasks

> `*` = required field

| Field | Type | Notes |
|---|---|---|
| Task Name* | Text field | Short label for the task |
| Imaging Type* | Checkbox menu | CT, MRI, X-ray, Ultrasound, PET |
| Due Date* | Date picker | When it should be done |
| Ordering Doctor* | Text field | Name of the doctor who ordered imaging |
| Office Phone | Input | Phone number for the imaging office |
| Body Part(s) | Text input | Which body parts |
| Notes | Text area | General notes |

---

### Detail: Referral Tasks

> `*` = required field

| Field | Type | Notes |
|---|---|---|
| Task Name* | Text field | Short label for the task |
| Specialty* | Select menu | See list below |
| Due Date* | Date picker | When it should be done |
| Doctor Name* | Text field | Name of the doctor |
| Phone Number | Input | Phone number for the referral |

**Specialty options:**
Cardiology, Endocrinology, Gastroenterology, Hematology/Oncology, Nephrology, Pulmonology, Rheumatology, Allergy and Immunology, Dermatology, OBGYN, General Surgery, Orthopedic Surgery, Vascular Surgery, Thoracic and Cardiac Surgery, Neurosurgery, Plastic/Reconstructive Surgery, Otolaryngology (ENT), Ophthalmology, Neurology, Psychiatry, Urology, Geriatric Medicine, Physical Medicine and Rehabilitation (PM&R)

---

### Detail: Screening Tasks

> `*` = required field

| Field | Type | Notes |
|---|---|---|
| Task Name* | Text field | Short label for the task |
| Screening Type* | Select menu | See list below |
| Due Date* | Date picker | When it should be done |
| Ordering Doctor | Text field | Name of the doctor who ordered it |
| Phone Number | Input | Phone number for the referral |

**Screening options:**
DEXA (bone density scan), Colonoscopy, Fecal Occult Blood Test (FOBT), Mammogram, Cervical Cancer Screening, Diabetic Eye Exam (Ophthalmologist)

---

### Detail: Pick Up Prescription Tasks

> `*` = required field

> No due date — these tasks always appear at the bottom of the dashboard, sorted after all dated tasks.

| Field | Type | Notes |
|---|---|---|
| Task Name* | Text field | Short label for the task |
| Prescription Name(s)* | Text area | Names of prescriptions to pick up |

---

### Detail: Call Back to Make an Appointment Tasks

> `*` = required field

> No due date — these tasks always appear at the bottom of the dashboard, sorted after all dated tasks.

| Field | Type | Notes |
|---|---|---|
| Task Name* | Text field | Short label for the task |
| Doctor Name* | Text field | Name of the doctor |
| Phone Number* | Text field | Phone number to call |

---

## Feature: Task Dashboard

- Users see a dashboard listing all of their **open tasks**
- Tasks are **sorted by due date**, earliest first — tasks without due dates (Prescriptions, Call Backs) go to the bottom
- Users can **mark a task as complete**
- Users can **filter to show completed tasks**
- Users can **mark a completed task as incomplete**
- Users can **delete any task** via a trash icon on the task card

### Task Card Display

Each task card shows:

- **Task type** (e.g. "Labs", "Referral", "Imaging")
- **Task name** (the user-defined title)
- **Due date** (if applicable)
- **Doctor name** (for task types where it is a required field: Labs, Imaging, Referrals, Screenings)
- **Completion status** (open vs. complete)
- **Trash icon** to delete the task
