export const RATIO = 0.3;
export const CANVAS = { w: 256, h: 256 };
export const HEAD_SIZE = { w: 1000, h: 1000 };
export const FACE_SIZE = { w: 300, h: 300 };
export const BODY_SIZE = { w: 1400, h: 800 };
export const ACCESSORY_SIZE = { w: 450, h: 200 };
export const FACIAL_HAIR_SIZE = { w: 500, h: 500 };

export const FACES = [
  ...['angry_with_fang', 'awe', 'blank', 'calm', 'cheeky', 'concerned_fear', 'concerned'],
  ...['contempt', 'cute', 'cyclops', 'driven', 'eating_happy', 'explaining'],
  ...['eyes_closed', 'fear', 'hectic', 'loving_grin_1', 'loving_grin_2', 'monster'],
  ...['old', 'rage', 'serious', 'smile_big', 'smile_lol', 'smile_teeth_gap'],
  ...['smile', 'solemn', 'suspicious', 'tired', 'very_angry'],
] as const;

export const HEADS = [
  ...['afro', 'bangs_2', 'bangs', 'bantu_knots', 'bear', 'bun_2', 'bun', 'buns'],
  ...['cornrows_2', 'cornrows', 'flat_top_long', 'flat_top', 'gray_bun'],
  ...['gray_medium', 'gray_short', 'hijab', 'long_afro', 'long_bangs'],
  ...['long_curly', 'long', 'medium_1', 'medium_2', 'medium_3', 'medium_bangs_2'],
  ...['medium_bangs_3', 'medium_bangs', 'medium_straight', 'mohawk_2', 'mohawk'],
  ...['no_hair_1', 'no_hair_2', 'no_hair_3', 'pomp', 'shaved_1', 'shaved_2'],
  ...['shaved_3', 'short_1', 'short_2', 'short_3', 'short_4', 'short_5', 'turban'],
  ...['twists_2', 'twists', 'hat-beanie', 'hat-hip'],
] as const;

export const BODIES = [
  ...['blazer_black_tee', 'button_shirt_1', 'button_shirt_2', 'coffee', 'device'],
  ...['dress', 'explaining', 'fur_jacket', 'gaming', 'gym_shirt', 'hoodie'],
  ...['killer', 'macbook', 'paper', 'pointing_up', 'polka_dot_jacket'],
  ...['polo_and_sweater', 'shirt_and_coat', 'sporty_tee', 'striped_pocket_tee'],
  ...['striped_tee', 'sweater_dots', 'sweater', 'tee_1', 'tee_2'],
  ...['tee_arms_crossed', 'tee_selena', 'thunder_t-shirt', 'turtleneck'],
  ...['whatever'],
] as const;

export const ACCESSORIES = [
  ...['*_none', 'eyepatch', 'glasses_2', 'glasses_3', 'glasses_4'],
  ...['glasses_5', 'glasses', 'sunglasses_2', 'sunglasses'],
] as const;

export const FACIAL_HAIR = [
  ...['*_none', 'chin', 'full_2', 'full_3', 'full_4', 'full', 'goatee_1', 'goatee_2'],
  ...['moustache_1', 'moustache_2', 'moustache_3', 'moustache_4', 'moustache_5'],
  ...['moustache_6', 'moustache_7', 'moustache_8', 'moustache_9'],
] as const;

export type Face = (typeof FACES)[number];
export type Head = (typeof HEADS)[number];
export type Body = (typeof BODIES)[number];
export type Accessory = (typeof ACCESSORIES)[number];
export type FacialHair = (typeof FACIAL_HAIR)[number];
