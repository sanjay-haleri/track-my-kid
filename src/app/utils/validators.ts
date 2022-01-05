export const EmailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MobileNumberValidation = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
export const PasswordValidation = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
export const LinkedInValidation = '^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$'
export const FacebookValidation = '(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?'
