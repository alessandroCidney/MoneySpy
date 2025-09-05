const googlePhotoRegex = /^(https:\/\/lh3\.googleusercontent\.com\/.+)(=s.+)$/

export function isGoogleProfilePhoto(str: string) {
  return googlePhotoRegex.test(str)
}

// https://developers.google.com/people/image-sizing?hl=pt-br
export function increaseGoogleProfilePhotoSize(str: string, newSize: number) {
  return str.replace(googlePhotoRegex, `$1=s${newSize}-c`)
}
