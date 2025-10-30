import { UnifiedParking } from '@shared/db';

export const getParkingPriceDetails = (data: UnifiedParking) => {
  const result = {
    firstHour: NaN,
    quarterHour: NaN,
    flatRate: NaN,
    residentDiscount: NaN,
  };
  const { taarif_yom, chalon_taarif_yom, taarif_layla, hearot_taarif } =
    data.pricing || {};

  // מאחדים את כל השדות שיש בהם מחירים
  const combineText = [taarif_yom, chalon_taarif_yom, taarif_layla]
    .filter(Boolean)
    .join(' ');

  // שעה ראשונה
  const firstHourMatch = combineText.match(
    /שעה ראשונה(?: או חלק ממנה)?[^0-9]*(\d+)\s*₪/
  );
  if (firstHourMatch) result.firstHour = Number(firstHourMatch[1]);

  // רבע שעה
  const quarterMatch = combineText.match(/(?:כל\s*)?¼\s*שעה[^0-9]*(\d+)\s*₪?/);
  if (quarterMatch) result.quarterHour = Number(quarterMatch[1]);

  // חד פעמי / כניסה
  const flatMatch = combineText.match(/(?:כניסה|חד פעמי)[^0-9]*(\d+)\s*₪/);
  if (flatMatch) result.flatRate = Number(flatMatch[1]);

  // הנחת תושב – מזהה גם "תינתן הנחה של X%"
  // הנחת תושב – מזהה כל נוסח של "הנחת תושב X%"
  const discountMatch =
    hearot_taarif?.match(/(?:הנחת תושב).*?(\d+)%/) ||
    combineText.match(/(?:הנחת תושב).*?(\d+)%/);
  if (discountMatch) result.residentDiscount = Number(discountMatch[1]) / 100;

  return result;
};
