import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  @State() items = [];

  componentWillLoad() {
    this.items = [
      { uid: 1, subject: 'Swipe to Delete', message: 'Swipe to Delete' },
      { uid: 2, subject: 'Swipe to Delete', message: 'Swipe to Delete' },
      { uid: 3, subject: 'Swipe to Delete', message: 'Swipe to Delete' },
    ];
  }

  handleDelete(uid) {
    this.items = this.items.filter(item => {
      return item.uid !== uid;
    });

    this.items = [...this.items];
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-list>
          {this.items.map(item => (
            <swipe-delete key={item.uid} onDeleted={() => this.handleDelete(item.uid)}>
              <p>{item.subject}</p>
            </swipe-delete>
          ))}
        </ion-list>
      </ion-content>,
    ];
  }
}
