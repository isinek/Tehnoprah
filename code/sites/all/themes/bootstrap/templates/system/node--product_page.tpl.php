<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $keys_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $keys_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
?>
<?php /*
<?php print $content['search'] ?>

<div id="category-description">

</div>
*/ ?>
<div id="all-products">
	<input id="totalProducts" type="hidden" value="<?php print $content['totalProducts'] ?>" />
	<h2><?php print $content['searchTitle'] ?></h2>
	<table class="products-table">
		<tbody>
			<?php foreach($content['products'] as $key => $product) : ?>
				<tr>
					<td>
						<?php if(isset($product->imgSrc)) : ?>
							<img src="<?php print $product->imgSrc ?>" alt="<?php print $product->imgAlt ?>" title="<?php print $product->imgTitle ?>" />
						<?php endif; ?>
					</td>
					<td>
						<h3><?php print $product->title ?></h3>
					</td>
					<td class="inquiry">
						<input type="hidden" value="<?php print $product->title ?>" />
						<a class="send-inquiry"><?php print t('Send request') ?></a>
					</td>
					<td class="details">
						<a class="product-details simple-orange" href="<?php print $product->productLink ?>"><?php print t('Product details') ?></a>
					</td>
				</tr>
			<?php endforeach; ?>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="4" class="prodPagination">
					<?php if ($content['pageNum'] > 1) : ?>
						<a href="?page=1"><<</a>
						<a href="?page=<?php print $content['pageNum']-1 ?>"><</a>
					<?php endif; ?>
					<?php $totalPages = (int)(($content['totalProducts']+$content['field_number_of_products'][0]['#markup']-1)/$content['field_number_of_products'][0]['#markup']);
						for ($i = 1; $i <= $totalPages; ++$i) : ?>
						<?php if ($i == $content['pageNum']) : ?>
							<span><?php print $i ?></span>
						<?php else : ?>
							<a href="?page=<?php print $i ?>"><?php print $i ?></a>
						<?php endif; ?>
					<?php endfor; ?>
					<?php if ($content['pageNum'] < $totalPages) : ?>
						<a href="?page=<?php print $content['pageNum']+1 ?>">></a>
						<a href="?page=<?php print $totalPages ?>">>></a>
					<?php endif; ?>
				</td>
			</tr>
		</tfoot>
	</table>
	<?php /*
	<?php foreach($content['products'] as $key => $product) : ?>
		<?php if($key%2 == 0) : ?>
			<div class="product-row">
		<?php endif; ?>
			<div class="product"><h3><?php print $product->title ?></h3>
				<?php if(isset($product->imgSrc)) : ?>
					<img src="<?php print $product->imgSrc ?>" alt="<?php print $product->imgAlt ?>" title="<?php print $product->imgTitle ?>" />
				<?php endif; ?>
				<?php print $product->body; ?>
				<a class="send-inquiry"><?php print t('Send request') ?></a>
				<a class="product-details" href="<?php print $product->productLink ?>"><?php print t('Product details') ?></a>
			</div>
		<?php if($key%2 == 1) : ?>
			</div>
		<?php endif; ?>
	<?php endforeach; ?>
	<?php if($key%2 == 1) : ?>
		<div class="product empty-spot">&nbsp;</div></div>
	<?php endif; ?>
	*/ ?>
</div>

<div class="popup-wrapper">
	<div id="contact-form">
		<h3><?php print t('Send us a request') ?></h3>
		
			<table class="email-form">
				<tr>
					<td><?php print t('Your full name') ?>: *</td>
					<td>
						<input id="name" name="name" type="text" required/>
						<div class="errorMsg"><?php print t('Enter full name.') ?></div>
					</td>
				</tr>
				<tr>
					<td><?php print t('Your email') ?>: *</td>
					<td>
						<input id="email" name="email" type="email" required/>
						<div class="errorMsg"><?php print t('Enter email.') ?></div>
					</td>
				</tr>
				<tr>
					<td><?php print t('Email subject') ?>: *</td>
					<td>
						<textarea id="subject" name="subject" rows="2" required></textarea>
						<div class="errorMsg"><?php print t('Enter subject.') ?></div>
					</td>
				</tr>
				<tr>
					<td><?php print t('Email body') ?>: *</td>
					<td>
						<textarea id="body" name="body" required></textarea>
						<div class="errorMsg"><?php print t('Enter body.') ?></div>
					</td>
				</tr>
				<tr>
					<td><button id="send-email-btn" ><?php print t('Send request')?></button></td>
					<td><button id="close-btn"><?php print t('Cancel')?></button></td>
				</tr>
			</table>
		
	</div>
</div>