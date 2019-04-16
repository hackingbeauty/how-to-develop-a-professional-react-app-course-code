export function getCurrentId(props) {
  const { pathname } = props.location
  return pathname.split('/')[2]
}
