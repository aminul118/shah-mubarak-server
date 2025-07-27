const generateJitsiLink = () => {
  const roomId = Math.random().toString(36).substring(2, 12);
  return `https://meet.jit.si/${roomId}`;
};

export { generateJitsiLink };
