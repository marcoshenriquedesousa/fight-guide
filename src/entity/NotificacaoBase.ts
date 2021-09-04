export abstract class NotificacaoBase {

    notifications: Array<{ mensagem: string }>;
  
    constructor() {
      this.notifications = new Array<{ mensagem: string }>();
    }
  
    AddNotification(mensagem: string): void {
      this.notifications.push({ mensagem: mensagem });
    }
  
    isTrue(value, mensagem) {
      if (value)
        this.notifications.push({ mensagem: mensagem });
    }
  
    isRequired(value, mensagem) {
      if (!value || value.length <= 0)
        this.notifications.push({ mensagem: mensagem });
    }
  
    hasMinLen(value, min, mensagem) {
      if (!value || value.length < min)
        this.notifications.push({ mensagem: mensagem });
    }
  
    hasMaxLen(value, max, mensagem) {
      if (!value || value.length > max)
        this.notifications.push({ mensagem: mensagem });
    }
  
    isFixedLen(value, len, mensagem) {
      if (value.length != len)
        this.notifications.push({ mensagem: mensagem });
    }
  
    isEmail(value, mensagem) {
      var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
      if (!reg.test(value))
        this.notifications.push({ mensagem: mensagem });
    }
  
    get allNotifications(): Array<{ mensagem: string }> {
      return this.notifications;
    }
  
    valid(): boolean {
      return this.notifications.length == 0;
    }
  }