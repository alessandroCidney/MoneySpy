const googlePhotoRegex = /^(https:\/\/lh3\.googleusercontent\.com\/.+)(=s.+)$/

export function isGoogleProfilePhoto(str: string) {
  return googlePhotoRegex.test(str)
}

// https://developers.google.com/people/image-sizing?hl=pt-br
export function increaseGoogleProfilePhotoSize(str: string, newSize: number) {
  return str.replace(googlePhotoRegex, `$1=s${newSize}-c`)
}

export const iconAvatarsList: Array<{
  type: 'icon'
  value: string
}> = [
  {
    type: 'icon',
    value: 'mdi-face-man',
  },
  {
    type: 'icon',
    value: 'mdi-face-woman',
  },
  {
    type: 'icon',
    value: 'mdi-emoticon-happy',
  },
  {
    type: 'icon',
    value: 'mdi-emoticon',
  },
  {
    type: 'icon',
    value: 'mdi-emoticon-excited',
  },
  {
    type: 'icon',
    value: 'mdi-emoticon-cool',
  },
  {
    type: 'icon',
    value: 'mdi-emoticon-wink',
  },
  {
    type: 'icon',
    value: 'mdi-robot',
  },
  {
    type: 'icon',
    value: 'mdi-robot-excited',
  },
  {
    type: 'icon',
    value: 'mdi-dog',
  },
  {
    type: 'icon',
    value: 'mdi-cat',
  },
  {
    type: 'icon',
    value: 'mdi-bird',
  },
  {
    type: 'icon',
    value: 'mdi-owl',
  },
  {
    type: 'icon',
    value: 'mdi-star-face',
  },
]
