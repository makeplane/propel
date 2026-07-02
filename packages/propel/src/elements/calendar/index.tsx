// react-day-picker isn't decomposable into `useRender` styled parts — its styled anatomy is a
// `classNames` map, so `calendarClassNames` is this family's styled contract. The `DayPicker`
// behavior grafts onto it in `components/calendar` (`<DayPicker classNames={calendarClassNames} />`),
// the react-day-picker analog of grafting Base UI behavior onto a styled `elements` element via `render`.
export { calendarClassNames } from "./variants";
