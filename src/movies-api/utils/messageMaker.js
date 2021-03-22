function buildMessage(entity, action) {
  const entityMessage = action == 'list' ? `${entity}s` : `${entity}`;
  const actionMessage = action == 'list' ? `${action}ed` : `${action}d`;

  return `${entityMessage} ${actionMessage}`;
}

module.exports = buildMessage;
