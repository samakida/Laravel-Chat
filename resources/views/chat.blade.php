@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="offset-4 col-4 offset-sm-1 col-sm-10">
            <div class="card">
                <div class="card-header">
                    <strong>ห้องพูดคุย</strong> <span class="badge badge-pill badge-danger">@{{ numberOfUsers }}</span>
                </div>
                <div class="card-body">
                    <div class="badge badge-pill badge-primary">@{{ typing }}</div>
                    <ul class="list-group"  style="height: 300px; overflow-y: auto;" v-chat-scroll>
                      <message
                      v-for="value,index in chat.message"
                      :key=value.index
                      :color= chat.color[index]
                      :user = chat.user[index]
                      :time = chat.time[index]
                      :align = chat.align[index]
                      >
                        @{{ value }}
                      </message>
                    </ul>
                </div>
                <div class="card-footer text-right">
                    <input type="text" class="form-control" placeholder="พิมพ์ข้อความ..." v-model='message' @keyup.enter='send'>
                    <br>
                    <a href='' class="btn btn-danger btn-sm" @click.prevent='deleteSession'>Delete Chats</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
