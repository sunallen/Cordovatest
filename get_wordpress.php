function login()
{
    $get_data = array();
    $get_data['user_login'] = $_GET["username"]; //接收從遠端APP傳來的帳號
    $get_data['user_password'] = $_GET["password"]; //接收從遠端APP傳來的密碼

    $user = wp_signon($get_data, false);檢查帳密，使用的是Wordpress API，名稱為「wp_signon」
    if (is_wp_error($user))
    {
        echo "FALSE";
        die();
    }

    header("Content-Type: charset=UTF-8; application/json"); //宣告此PHP檔案，回應的格式為JSON，文字編碼為UTF-8

    $posts_array = array();

//下面使用Wordpress API中的WP_Query，官方文件網址如右： https://codex.wordpress.org/Class_Reference/WP_Query

//先將要取出的資抖，做出設定，並放置陣列中。
//下列要取出資料為「依日期、降冪排序、分類代碼ID為3的文章。」

    $args = array("post_type" => "post", "orderby" => "date", "order" => "DESC", "post_status" => "publish", "cat" => "3");

    $posts = new WP_Query($args); //將取出資料，放進$posts變數中。

    if($posts->have_posts()):
        while($posts->have_posts()): 
            $posts->the_post();

$post_array = array('title' => get_the_title(),  //讀取文章標題
            'link' => get_the_permalink(), //讀取文章連結
            'date' => get_the_date(), //讀取發出日期
            'image' => wp_get_attachment_url(get_post_thumbnail_id())); //讀取特色圖片
            array_push($posts_array, $post_array); //將上述的值，再放進陣列
        endwhile;
        else:
            echo "{'posts' = []}";
            die();
    endif;

    echo json_encode($posts_array);  回傳以json編碼的陣列內容。
    die();
    die();
}

add_action("wp_ajax_login", "already_logged_in"); //add_action，是Wordpress本身提供的函式(函數)
add_action("wp_ajax_nopriv_login", "login");