import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ info }) => {
	const style={
		color: 'red'
	}
	return info === null ? null : (
		<Alert variant={info.type} style={style}>{info.message}</Alert>
	)
}

export default AlertMessage