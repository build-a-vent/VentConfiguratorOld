export const configStyles = {
  wrapper: {
    position: 'relative',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  help: (editable) => ({
    fontSize: 12,
    marginBottom: 10,
    display: editable === false ? 'none' : null,
  }),
  input: (active) => ({
    borderWidth: active === true ? 1 : 0,
    padding: 5,
    width: '80%',
  }),
  helpIcon: {
    position: 'absolute',
    top: -10,
    right: 0,
    width: 40,
    height: 40,
    zIndex: 2,
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  buttonWrapper: (active) => ({
    display: active === false ? 'none' : 'flex',
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  }),
  button: {
    marginTop: 10,
  },
};
